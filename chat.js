export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Add ANTHROPIC_API_KEY to Vercel environment variables.' });
  }

  try {
    // Call Anthropic API with web search tool
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: system || 'You are a helpful assistant.',
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
            max_uses: 3
          }
        ],
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    // Extract text content and check if web search was used
    let textContent = '';
    let searched = false;

    for (const block of data.content) {
      if (block.type === 'text') {
        textContent += block.text;
      } else if (block.type === 'tool_use' && block.name === 'web_search') {
        searched = true;
      }
    }

    // If model used tools, it may need another pass — handle multi-turn tool use
    if (data.stop_reason === 'tool_use') {
      // Build tool results and call again
      const toolResults = [];
      for (const block of data.content) {
        if (block.type === 'tool_use') {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: 'Search completed.'
          });
        }
      }

      const followUp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'web-search-2025-03-05'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: system || 'You are a helpful assistant.',
          tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
          messages: [
            ...messages,
            { role: 'assistant', content: data.content },
            { role: 'user', content: toolResults }
          ]
        })
      });

      const followData = await followUp.json();
      textContent = followData.content
        ?.filter(b => b.type === 'text')
        .map(b => b.text)
        .join('') || textContent;
    }

    return res.status(200).json({ content: textContent, searched });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
}

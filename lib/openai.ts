import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateStateRightsGuide(stateCode: string, stateName: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are a legal expert specializing in civil rights and police interactions. Generate accurate, actionable legal guidance for ${stateName} (${stateCode}). Focus on practical advice that can help people stay safe during police encounters.`
        },
        {
          role: "user",
          content: `Generate a comprehensive rights guide for ${stateName} that includes:
          1. What TO DO during police interactions (5-7 key points)
          2. What NOT TO SAY (4-5 key points)
          3. Key constitutional rights (4-5 rights)
          4. Important emergency numbers specific to ${stateName}
          
          Make the language clear, concise, and actionable. Focus on de-escalation and safety.`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    // Parse the response into structured data
    const lines = content.split('\n').filter(line => line.trim());
    
    const whatToDo: string[] = [];
    const whatNotToSay: string[] = [];
    const keyRights: string[] = [];
    const emergencyNumbers: string[] = [];
    
    let currentSection = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().includes('what to do') || trimmed.toLowerCase().includes('what you should do')) {
        currentSection = 'whatToDo';
        continue;
      }
      if (trimmed.toLowerCase().includes('what not to say') || trimmed.toLowerCase().includes('avoid saying')) {
        currentSection = 'whatNotToSay';
        continue;
      }
      if (trimmed.toLowerCase().includes('key rights') || trimmed.toLowerCase().includes('constitutional rights')) {
        currentSection = 'keyRights';
        continue;
      }
      if (trimmed.toLowerCase().includes('emergency numbers') || trimmed.toLowerCase().includes('important numbers')) {
        currentSection = 'emergencyNumbers';
        continue;
      }
      
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || /^\d+\./.test(trimmed)) {
        const cleanedLine = trimmed.replace(/^[-•\d.]\s*/, '');
        if (cleanedLine) {
          switch (currentSection) {
            case 'whatToDo':
              whatToDo.push(cleanedLine);
              break;
            case 'whatNotToSay':
              whatNotToSay.push(cleanedLine);
              break;
            case 'keyRights':
              keyRights.push(cleanedLine);
              break;
            case 'emergencyNumbers':
              emergencyNumbers.push(cleanedLine);
              break;
          }
        }
      }
    }

    return {
      whatToDo: whatToDo.length > 0 ? whatToDo : [
        'Remain calm and keep your hands visible',
        'Clearly state "I am exercising my right to remain silent"',
        'Ask "Am I free to leave?" if not under arrest',
        'Request a lawyer if arrested',
        'Remember badge numbers and patrol car numbers'
      ],
      whatNotToSay: whatNotToSay.length > 0 ? whatNotToSay : [
        'Don\'t argue or resist, even if you believe the stop is unfair',
        'Don\'t consent to searches',
        'Don\'t provide information beyond what\'s legally required',
        'Don\'t make sudden movements'
      ],
      keyRights: keyRights.length > 0 ? keyRights : [
        'Right to remain silent (5th Amendment)',
        'Right to refuse consent to search',
        'Right to an attorney',
        'Right to record police interactions (in most circumstances)'
      ],
      emergencyNumbers: emergencyNumbers.length > 0 ? emergencyNumbers : [
        '911 - Emergency Services',
        '1-877-6-PROFILE - ACLU Hotline',
        'Local Legal Aid Society',
        'State Bar Association Referral Service'
      ]
    };
  } catch (error) {
    console.error('Error generating rights guide:', error);
    // Return default guide if generation fails
    return {
      whatToDo: [
        'Remain calm and keep your hands visible',
        'Clearly state "I am exercising my right to remain silent"',
        'Ask "Am I free to leave?" if not under arrest',
        'Request a lawyer if arrested',
        'Remember badge numbers and patrol car numbers'
      ],
      whatNotToSay: [
        'Don\'t argue or resist, even if you believe the stop is unfair',
        'Don\'t consent to searches',
        'Don\'t provide information beyond what\'s legally required',
        'Don\'t make sudden movements'
      ],
      keyRights: [
        'Right to remain silent (5th Amendment)',
        'Right to refuse consent to search',
        'Right to an attorney',
        'Right to record police interactions (in most circumstances)'
      ],
      emergencyNumbers: [
        '911 - Emergency Services',
        '1-877-6-PROFILE - ACLU Hotline',
        'Local Legal Aid Society',
        'State Bar Association Referral Service'
      ]
    };
  }
}

export async function generateDeEscalationScript(scenario: string, language: 'en' | 'es' = 'en') {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an expert in police de-escalation and civil rights. Generate calm, respectful scripts that help people assert their rights while maintaining safety during police interactions.`
        },
        {
          role: "user",
          content: `Generate a de-escalation script for a ${scenario} scenario in ${language === 'es' ? 'Spanish' : 'English'}. The script should:
          1. Be respectful and non-confrontational
          2. Clearly assert constitutional rights
          3. Help de-escalate tension
          4. Be easy to remember under stress
          5. Be 2-3 sentences maximum
          
          Focus on safety and legal protection.`
        }
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content || getDefaultScript(scenario, language);
  } catch (error) {
    console.error('Error generating de-escalation script:', error);
    return getDefaultScript(scenario, language);
  }
}

function getDefaultScript(scenario: string, language: 'en' | 'es'): string {
  const scripts = {
    en: {
      traffic_stop: "Officer, I am exercising my right to remain silent. I do not consent to any searches. Am I free to leave?",
      street_encounter: "I am exercising my right to remain silent and do not consent to any searches. Am I being detained or am I free to go?",
      home_visit: "I am exercising my right to remain silent. I do not consent to you entering my home without a warrant. Please show me the warrant.",
      general: "I am respectfully exercising my right to remain silent. I do not consent to any searches. I would like to speak with an attorney."
    },
    es: {
      traffic_stop: "Oficial, estoy ejerciendo mi derecho a permanecer en silencio. No consiento a ningún registro. ¿Soy libre de irme?",
      street_encounter: "Estoy ejerciendo mi derecho a permanecer en silencio y no consiento a ningún registro. ¿Estoy detenido o soy libre de irme?",
      home_visit: "Estoy ejerciendo mi derecho a permanecer en silencio. No consiento que entre a mi casa sin una orden judicial. Por favor muéstreme la orden.",
      general: "Respetuosamente estoy ejerciendo mi derecho a permanecer en silencio. No consiento a ningún registro. Me gustaría hablar con un abogado."
    }
  };

  return scripts[language][scenario as keyof typeof scripts.en] || scripts[language].general;
}

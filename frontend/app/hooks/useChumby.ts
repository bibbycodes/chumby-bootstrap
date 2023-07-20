export default function useChumby() {

  async function createChumby(creature: string, apparel: string[]): Promise<any> {
    const response = await fetch('http://localhost:4000/generations/sitting-chumby', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({creature, apparel}),
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();
    return data.generatedImage;
  }

  return {
    createChumby
  }
}

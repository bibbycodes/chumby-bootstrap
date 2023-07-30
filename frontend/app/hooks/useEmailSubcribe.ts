export default function useEmailSubscribe() {

  async function subscribeEmail(email:string): Promise<any> {
    const response = await fetch('http://localhost:4000/messages/email/subscribe', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();
    return data;
  }

  return {
    subscribeEmail
  }
}

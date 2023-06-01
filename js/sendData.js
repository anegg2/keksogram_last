export async function send(data){
    const res = await fetch(
        'https://28.javascript.pages.academy/kekstagram', 
        {
            method: 'POST',
            body: data,
        });
    return res;
}; 
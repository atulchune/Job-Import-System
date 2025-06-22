export const fetcher = async (url: string) => {
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Fetch error (${response.status}): ${errorText}`);
        }
        return data
    } catch (error) {
        console.error("Error form server:- ", error);
    }
}
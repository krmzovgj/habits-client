export const getHabits = async (token: string) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data
        }
    } catch (error) {
        console.log(error);
    }

};

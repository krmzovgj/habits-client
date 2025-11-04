export const getHabitById = async (token: string, habitId: string) => {
    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit/${habitId}`,
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
            const data = await response.json()
            return data
        }
    } catch (error) {}

};

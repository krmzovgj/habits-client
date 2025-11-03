export const completeHabit = async (token: string, habitId: string) => {
    if (!token) return;

    try {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/habit-log/${habitId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    completed: true
                })
            }
        );
    } catch (error) {}
};

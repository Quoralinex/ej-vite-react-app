type ChatPayload = {
        messages: unknown[];
        assistantType?: string;
};

type ChatResponse = {
        success: boolean;
        output?: { content?: { text?: { value?: string } }[] };
        error?: string;
};

type InvocationResult = { data: ChatResponse; error: { message?: string } | null };

export const supabase = {
        functions: {
                async invoke(_name: string, { body }: { body: ChatPayload }): Promise<InvocationResult> {
                        console.warn("Supabase client stub invoked", body);
                        return { data: { success: false, error: "Supabase client not configured" }, error: null };
                },
        },
};

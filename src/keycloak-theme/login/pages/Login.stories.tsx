import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "login/login.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithError: Story = {
    render: () => (
        <KcPageStory 
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => field === "password",
                    get: (field: string) => field === "password" ? "Senha incorreta" : "",
                    exists: () => true
                }
            }}
        />
    )
}; 
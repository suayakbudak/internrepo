import { useState, useEffect, useCallback, startTransition } from "react";

import Typography from "@mui/material/Typography";

import { paths } from "src/routes/paths";
import { useRouter, useSearchParams } from "src/routes/hooks";

import { CONFIG } from "src/global-config";
import { DashboardContent } from "src/pages/protected/layout";
import { useGetContacts, useGetConversation, useGetConversations } from "src/lib/actions/chat";

import { EmptyContent } from "src/components/empty-content";

import { useMockedUser } from "src/hooks/use-mocked-user";

import { ChatNav } from "./components/chat-nav";
import { ChatLayout } from "./components/layout";
import { ChatRoom } from "./components/chat-room";
import { ChatMessageList } from "./components/chat-message-list";
import { ChatMessageInput } from "./components/chat-message-input";
import { ChatHeaderDetail } from "./components/chat-header-detail";
import { ChatHeaderCompose } from "./components/chat-header-compose";
import { useCollapseNav } from "./hooks/use-collapse-nav";

// ----------------------------------------------------------------------

export function ChatView() {
  const router = useRouter();

  const { user } = useMockedUser();

  const { contacts } = useGetContacts();

  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get("id") || "";

  const { conversations, conversationsLoading } = useGetConversations();
  const { conversation, conversationError, conversationLoading } =
    useGetConversation(selectedConversationId);

  const roomNav = useCollapseNav();
  const conversationsNav = useCollapseNav();

  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    if (!selectedConversationId) {
      startTransition(() => {
        router.push(paths.anasayfa.iletisim.sohbet);
      });
    }
  }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);

  const filteredParticipants = conversation
    ? conversation.participants.filter((participant) => participant.id !== `${user?.id}`)
    : [];

  const hasConversation = selectedConversationId && conversation;

  return (
    <DashboardContent
      maxWidth={false}
      sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}
    >
      <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
        Sohbet
      </Typography>

      <ChatLayout
        slots={{
          header: hasConversation ? (
            <ChatHeaderDetail
              collapseNav={roomNav}
              participants={filteredParticipants}
              loading={conversationLoading}
            />
          ) : (
            <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
          ),
          nav: (
            <ChatNav
              contacts={contacts}
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              collapseNav={conversationsNav}
              loading={conversationsLoading}
            />
          ),
          main: (
            <>
              {selectedConversationId ? (
                conversationError ? (
                  <EmptyContent
                    title={conversationError.message}
                    imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-chat-empty.svg`}
                  />
                ) : (
                  <ChatMessageList
                    messages={conversation?.messages ?? []}
                    participants={filteredParticipants}
                    loading={conversationLoading}
                  />
                )
              ) : (
                <EmptyContent
                  title="Good morning!"
                  description="Write something awesome..."
                  imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-chat-active.svg`}
                />
              )}

              <ChatMessageInput
                recipients={recipients}
                onAddRecipients={handleAddRecipients}
                selectedConversationId={selectedConversationId}
                disabled={!recipients.length && !selectedConversationId}
              />
            </>
          ),
          details: hasConversation && (
            <ChatRoom
              collapseNav={roomNav}
              participants={filteredParticipants}
              loading={conversationLoading}
              messages={conversation?.messages ?? []}
            />
          ),
        }}
      />
    </DashboardContent>
  );
}

-- CreateTable
CREATE TABLE "Chat" (
    "chat" INTEGER NOT NULL,
    "classes" TEXT[],
    "lang" TEXT NOT NULL,

    PRIMARY KEY ("chat")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat.chat_unique" ON "Chat"("chat");

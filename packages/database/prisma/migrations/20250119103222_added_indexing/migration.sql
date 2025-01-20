-- CreateIndex
CREATE INDEX "API_id_idx" ON "API"("id");

-- CreateIndex
CREATE INDEX "API_userId_idx" ON "API"("userId");

-- CreateIndex
CREATE INDEX "APICheck_apiId_idx" ON "APICheck"("apiId");

-- CreateIndex
CREATE INDEX "Incident_apiId_idx" ON "Incident"("apiId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

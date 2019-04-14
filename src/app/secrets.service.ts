import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SecretsService {
  // to add a new secret: update here and add a getter
  private secrets = {
    apiKey: "",
    formId: "",
    sheetId: ""
  };

  constructor() {
    const secretsJson = localStorage.getItem("friendlog/secrets");

    const expectedKeys = Object.keys(this.secrets);
    if (!secretsJson) {
      this.promptForSecrets("Secrets error: No secrets found.");
      return;
    }
    const secrets = JSON.parse(secretsJson);
    const hasAllKeys = expectedKeys.every(key => secrets.hasOwnProperty(key));
    if (!hasAllKeys) {
      this.promptForSecrets("Secrets error: At least one secret is missing.");
      return;
    }

    this.secrets = secrets;
  }

  promptForSecrets(message: string) {
    const newSecrets = window.prompt(
      message + "\n\nEnter secrets or leave blank for no action."
    );
    if (newSecrets) {
      localStorage.setItem("friendlog/secrets", newSecrets);
      location.reload();
    }
  }

  getApiKey(): string {
    return this.secrets.apiKey;
  }
  getFormId(): string {
    return this.secrets.formId;
  }
  getSheetId(): string {
    return this.secrets.sheetId;
  }
}

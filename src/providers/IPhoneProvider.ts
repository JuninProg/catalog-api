export interface IPhoneProvider {
  parsePhone(phone: string): string | null;
}

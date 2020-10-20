export default interface Tickable {
  tick(): Promise<void>;
}


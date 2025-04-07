import { Args, DeserializedResult, Serializable } from "@massalabs/massa-web3";

export class Category implements Serializable<Category> {
  constructor(
    public id: bigint = 0n,
    public name: string = "",
    public thumbnail: string = "",
    public count: bigint = 0n
  ) {}

  serialize(): Uint8Array {
    return new Args()
      .addU64(this.id)
      .addString(this.name)
      .addString(this.thumbnail)
      .addU64(this.count)
      .serialize();
  }

  deserialize(data: Uint8Array, offset: number): DeserializedResult<Category> {
    try {
      const args = new Args(data, offset);

      console.log("Deserializing Category at offset:", offset);
      console.log("Raw data:", data);

      this.id = args.nextU64();
      console.log("Deserialized id:", this.id.toString());

      this.name = args.nextString();
      console.log("Deserialized name:", this.name);

      this.thumbnail = args.nextString();
      console.log("Deserialized thumbnail:", this.thumbnail);

      this.count = args.nextU64();
      console.log("Deserialized count:", this.count.toString());

      return { instance: this, offset: args.getOffset() };
    } catch (error) {
      console.error("Error in Category deserialization:", error);
      throw error;
    }
  }
}

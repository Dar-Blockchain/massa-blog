import { Args, DeserializedResult, Serializable } from "@massalabs/massa-web3";

export class Post implements Serializable<Post> {
  constructor(
    public id: bigint = 0n,
    public author: string = "", // Address string
    public title: string = "",
    public excerpt: string = "",
    public content: string = "",
    public featuredImage: string = "",
    public categoryId: string = "",
    public readingTime: bigint = 0n,
    public tags: string = "",
    public createdAt: bigint = 0n,
    public address: string = ""
  ) {}

  serialize(): Uint8Array {
    const args = new Args()
      .addU64(this.id)
      .addString(this.author)
      .addString(this.title)
      .addString(this.excerpt)
      .addString(this.content)
      .addString(this.featuredImage)
      .addString(this.categoryId)
      .addU64(this.readingTime)
      .addString(this.tags)
      .addU64(this.createdAt);

    return args.serialize();
  }

  deserialize(data: Uint8Array, offset: number): DeserializedResult<Post> {
    const args = new Args(data, offset);

    this.id = args.nextU64();
    this.author = args.nextString();
    this.title = args.nextString();
    this.excerpt = args.nextString();
    this.content = args.nextString();
    this.featuredImage = args.nextString();
    this.categoryId = args.nextString();
    this.readingTime = args.nextU64();
    this.tags = args.nextString();
    this.createdAt = args.nextU64();

    return { instance: this, offset: args.getOffset() };
  }
}

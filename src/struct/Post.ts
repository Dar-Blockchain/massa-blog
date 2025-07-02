import { Args, DeserializedResult, Serializable } from '@massalabs/massa-web3';

export class Post implements Serializable<Post> {
  constructor(
    public id: bigint = 0n, // Use bigint to handle u64 values in JavaScript
    public author: string = '', // Using Address type
    public title: string = '',
    public excerpt: string = '',
    public content: string = '',
    public featuredImage: string = '',
    public categoryId: string = '',
    public readingTime: bigint = 0n,
    public tags: string = '',
    public createdAt: bigint = 0n, // Use bigint for timestamp
    public likesNbr: bigint = 0n, // Number of likes
    public commentsNbr: bigint = 0n, // Number of comments

  ) {}

  // Serialize the Post object for sending to the backend
  serialize(): Uint8Array {
    const args = new Args()
      .addU64(this.id)
      .addString(this.author) // Serialize Address properly
      .addString(this.title)
      .addString(this.excerpt)
      .addString(this.content)
      .addString(this.featuredImage)
      .addString(this.categoryId)
      .addU64(this.readingTime)
      .addString(this.tags)
      .addU64(this.createdAt)
      .addU64(this.likesNbr)
      .addU64(this.commentsNbr);



    return args.serialize();
  }

  // Deserialize the data received from the backend
  deserialize(data: Uint8Array, offset: number): DeserializedResult<Post> {
    const args = new Args(data, offset);

    this.id = args.nextU64(); // Deserialize id as bigint
    this.author = args.nextString(); // Deserialize author as Address
    this.title = args.nextString(); // Deserialize title
    this.excerpt = args.nextString(); // Deserialize excerpt
    this.content = args.nextString(); // Deserialize content
    this.featuredImage = args.nextString(); // Deserialize featuredImage
    this.categoryId = args.nextString(); // Deserialize categoryId
    this.readingTime = args.nextU64(); // Deserialize readingTime as bigint
    this.tags = args.nextString(); // Deserialize tags
    this.createdAt = args.nextU64(); // Deserialize createdAt as bigint
    this.likesNbr = args.nextU64(); // Deserialize likes as bigint
    this.commentsNbr = args.nextU64(); // Deserialize comments as bigint

    return { instance: this, offset: args.getOffset() };
  }
}

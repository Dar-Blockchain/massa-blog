import { Args, DeserializedResult, Serializable } from '@massalabs/massa-web3';

export class Comment implements Serializable<Comment> {
  constructor(
    public id: bigint = 0n, // Use bigint for u64 values
    public postId: bigint = 0n, // postId as bigint
    public commenter: string = '', // Address serialized as string
    public text: string = '',
    public createdAt: bigint = 0n, // createdAt as bigint
    public parentId: bigint = 0n, // parentId as bigint
    public commenterFirstName: string = '',
    public commenterLastName: string = '',
    public commenterProfilePic: string = '',
    public likesNbr: bigint = 0n,
    public commentsNbr: bigint = 0n,
  ) {}

  // Serialize the Comment object
  serialize(): Uint8Array {
    const args = new Args()
      .addU64(this.id)
      .addU64(this.postId)
      .addString(this.commenter) // Address as string
      .addString(this.text)
      .addU64(this.createdAt)
      .addU64(this.parentId)
      .addString(this.commenterFirstName)
      .addString(this.commenterLastName)
      .addString(this.commenterProfilePic)
      .addU64(this.likesNbr)
      .addU64(this.commentsNbr);

    return new Uint8Array(args.serialize());
  }

  // Deserialize the Comment object
  deserialize(data: Uint8Array, offset: number): DeserializedResult<Comment> {
    const args = new Args(data, offset);

    this.id = args.nextU64(); // Deserialize id
    this.postId = args.nextU64(); // Deserialize postId
    this.commenter = args.nextString(); // Deserialize commenter
    this.text = args.nextString(); // Deserialize text
    this.createdAt = args.nextU64(); // Deserialize createdAt
    this.parentId = args.nextU64(); // Deserialize parentId
    this.commenterFirstName = args.nextString(); // Deserialize commenterFirstName
    this.commenterLastName = args.nextString(); // Deserialize commenterLastName
    this.commenterProfilePic = args.nextString(); // Deserialize commenterProfilePic
    this.likesNbr = args.nextU64(); // Deserialize likesNbr
    this.commentsNbr = args.nextU64(); // Deserialize commentsNbr

    return { instance: this, offset: args.getOffset() };
  }
}

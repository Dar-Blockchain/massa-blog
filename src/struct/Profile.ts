import { Args, DeserializedResult, Serializable } from "@massalabs/massa-web3";

export class Profile implements Serializable<Profile> {
  constructor(
    public profileContract: string = "",
    public address: string = "",
    public firstName: string = "",
    public lastName: string = "",
    public profilePicUrl: string = "",
    public bio: string = "",
    public coverPhotoUrl: string = "",
    public email: string = "",
    public facebook: string = "",
    public twitter: string = "",
    public linkedin: string = "",
    public instagram: string = "",
    public website: string = ""
  ) {}

  serialize(): Uint8Array {
    const args = new Args()
      .addString(this.profileContract)
      .addString(this.address)
      .addString(this.firstName)
      .addString(this.lastName)
      .addString(this.profilePicUrl)
      .addString(this.bio)
      .addString(this.coverPhotoUrl)
      .addString(this.email)
      .addString(this.facebook)
      .addString(this.twitter)
      .addString(this.linkedin)
      .addString(this.instagram)
      .addString(this.website);

    return args.serialize();
  }

  deserialize(data: Uint8Array, offset: number): DeserializedResult<Profile> {
    const args = new Args(data, offset);

    this.profileContract = args.nextString();
    this.address = args.nextString();
    this.firstName = args.nextString();
    this.lastName = args.nextString();
    this.profilePicUrl = args.nextString();
    this.bio = args.nextString();
    this.coverPhotoUrl = args.nextString();
    this.email = args.nextString();
    this.facebook = args.nextString();
    this.twitter = args.nextString();
    this.linkedin = args.nextString();
    this.instagram = args.nextString();
    this.website = args.nextString();

    return { instance: this, offset: args.getOffset() };
  }

  // Optional: Add a helper method to display the profile
  displayName(): string {
    return `${this.firstName} ${this.lastName}`.trim() || "Anonymous";
  }
}

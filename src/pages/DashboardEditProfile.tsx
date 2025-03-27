import { useEffect, useState } from "react";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import { SOCIALS_DATA } from "../components/SocialsShare/SocialsShare";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { checkUserProfile, createProfile } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Profile } from "../struct/Profile";

const PROFILE_SOCIALS = [
  ...SOCIALS_DATA,
  {
    id: "Website",
    name: "Website",
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    href: "#",
  },
];

const DashboardEditProfile = () => {
  const { connectedAccount } = useAccountStore();
  const userProfile = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [socialUrls, setSocialUrls] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    website: "",
  });

  useEffect(() => {
    if (connectedAccount) {
      dispatch(checkUserProfile(connectedAccount));
    }
  }, [connectedAccount, dispatch]);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setBio(userProfile.bio || "");
      setProfilePicUrl(userProfile.profilePicUrl || "");
      setCoverPhotoUrl(userProfile.coverPhotoUrl || "");
      setEmail(userProfile.email || "");
      setSocialUrls({
        facebook: userProfile.facebook || "",
        twitter: userProfile.twitter || "",
        linkedin: userProfile.linkedin || "",
        instagram: userProfile.instagram || "",
        website: userProfile.website || "",
      });
    }
  }, [userProfile]);

  const handleSocialUrlChange = (socialId: string, value: string) => {
    setSocialUrls((prev) => ({
      ...prev,
      [socialId.toLowerCase()]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedAccount) {
      console.error("No connected account");
      return;
    }

    const profileData = new Profile(
      firstName,
      lastName,
      profilePicUrl,
      bio,
      coverPhotoUrl,
      email,
      socialUrls.facebook,
      socialUrls.twitter,
      socialUrls.linkedin,
      socialUrls.instagram,
      socialUrls.website
    );

    try {
      await dispatch(createProfile({ connectedAccount, profileData })).unwrap();
      // Refresh profile data after successful creation
      dispatch(checkUserProfile(connectedAccount));
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Name Fields */}
        <label className="block">
          <Label>First name</Label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            type="text"
            className="mt-1"
          />
        </label>
        <label className="block">
          <Label>Last name</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            type="text"
            className="mt-1"
          />
        </label>

        {/* Bio */}
        <label className="block md:col-span-2">
          <Label>Bio</Label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            className="mt-1 block w-full rounded-lg border-neutral-200 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
            rows={4}
          />
        </label>

        {/* Profile Picture */}
        <label className="block md:col-span-2">
          <Label>Profile Picture URL</Label>
          <Input
            type="url"
            value={profilePicUrl}
            onChange={(e) => setProfilePicUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="mt-1"
          />
          {profilePicUrl && (
            <div className="mt-4">
              <Label>Preview</Label>
              <img
                src={profilePicUrl}
                alt="Profile Preview"
                className="mt-1 h-24 w-24 rounded-full object-cover"
              />
            </div>
          )}
        </label>

        {/* Cover Photo */}
        <label className="block md:col-span-2">
          <Label>Cover Photo URL</Label>
          <Input
            type="url"
            value={coverPhotoUrl}
            onChange={(e) => setCoverPhotoUrl(e.target.value)}
            placeholder="https://example.com/cover.jpg"
            className="mt-1"
          />
          {coverPhotoUrl && (
            <div className="mt-4">
              <Label>Preview</Label>
              <img
                src={coverPhotoUrl}
                alt="Cover Preview"
                className="mt-1 h-32 w-full rounded-lg object-cover"
              />
            </div>
          )}
        </label>

        {/* Social Links */}
        {PROFILE_SOCIALS.map((social) => (
          <label
            className={`block ${
              social.id === "Website" ? "md:col-span-2" : ""
            }`}
            key={social.id}
          >
            <Label>
              <div className="flex items-center space-x-2">
                <div dangerouslySetInnerHTML={{ __html: social.icon }} />
                <span>{social.name}</span>
              </div>
            </Label>
            <Input
              type="url"
              value={
                socialUrls[social.id.toLowerCase() as keyof typeof socialUrls]
              }
              onChange={(e) => handleSocialUrlChange(social.id, e.target.value)}
              placeholder={`https://${social.id.toLowerCase()}.com/yourusername`}
              className="mt-1"
            />
          </label>
        ))}

        {/* Email */}
        <label className="block md:col-span-2">
          <Label>Email address</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
            className="mt-1"
          />
        </label>

        <ButtonPrimary className="md:col-span-2" type="submit">
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;

import { getProfileById } from "api/profile";
import IProfile from "interfaces/profiles/profile.interface";
import { useQuery } from "react-query";

const useProfile = (profileId: string | undefined) => {
  return useQuery<IProfile>(
    ["profiles", profileId],
    async () => {
      const {
        data: { profile },
      } = await getProfileById(profileId!);
      return profile;
    },
    { enabled: !!profileId }
  );
};

export default useProfile;

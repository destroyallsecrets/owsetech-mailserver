import ProfileClient from "./ProfileClient";

// @ts-ignore
export default function ProfilePage(props: any) {
  // Next.js sometimes passes params as props.params, sometimes as just props
  const params = props.params || props;
  return <ProfileClient username={params.username} domain={params.domain} />;
}

import ButtonSubmit from "../../common/button/ButtonSubmit";

export default function Setting() {
  return (
    <div className="container mx-auto flex min-h-screen items-start justify-center pt-10">
      <div className="w-full max-w-3xl p-10">
        <h1 className="text-xl text-black">Delete My Account</h1>
        <p className="mt-2 mb-2 text-gray-700">
          Are you sure you want to delete your account permanently? All Data,
          Ads, and Credit related to this account will be deleted!
        </p>

        <ButtonSubmit
          text={
            <span>
              <span className="flex items-center gap-2">
                I am sure! Delete Account
              </span>
            </span>
          }
          className="!w-full rounded-xl"
        />
      </div>
    </div>
  );
}

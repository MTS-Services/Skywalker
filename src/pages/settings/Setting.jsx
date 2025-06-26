export default function Setting() {
    return (
        <>
            <div className="container mx-auto min-h-[65vh]">
                <div className="max-w-3xl mx-auto">
                    <div className="h-8"></div>
                    <h1>Delete My Account</h1>
                    <div className="h-1.5"></div>
                    <p>
                        Are you sure you want to delete your account permanently? All Data,
                        Ads and Credit related to this account will be deleted!
                    </p>
                    <div className="h-4"></div>
                    <button className="text-base shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-12 px-8 rounded-lg font-bold bg-primary text-on-primary active:bg-active-primary w-full">
                        I am sure! Delete Account
                    </button>
                </div>
            </div>
        </>
    )
}

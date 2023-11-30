
function Loading() {
    // Loading Page Animation
    return (
    <>
        <div className="z-20 absolute w-full h-full bg-black/70">
            <div className="flex justify-center items-center h-full">
                <div className="w-[50px] h-[80px] flex  justify-center items-center p-2 border rounded-full">
                    <div className="w-[20px] h-[20px] animate-bounce bg-white rounded-full"></div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Loading;
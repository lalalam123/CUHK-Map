import Image from "next/image";

export const DrivingBusWidget = () => {
  return (
    <div
			className="relative w-16 h-16 bg-blue-300 rounded-full"
			style={{
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			animation: "moveClouds 5s linear infinite",
			animationName: `{
					'0%': { 'background-position': '0 0' },
					'100%': { 'background-position': '-100% 0' }
				}`,
			}}
		>
			<div
			className="absolute top-0"
			style={{
				width: "60px",
				height: "30px",
				backgroundColor: "#fff",
				borderRadius: "50px 50px 50px 50px / 60px 60px 60px 60px",
				animation: "moveClouds 5s linear infinite",
				animationName: `{
							'0%': { transform: 'translateX(0)' },
							'100%': { transform: 'translateX(-100%)' }
						}`,
			}}
			/>
			<Image
			src="/bus.png"
			alt="AskAI"
			width={64}
			height={64}
			className="absolute bottom-0"
			style={{
				animation: "jump 0.3s ease-in-out infinite", // Decreased time for more frequency
				animationName: `{
				'0%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-10px)' }, // Increased distance for more vigorous jump
				'100%': { transform: 'translateY(0)' }
				}`,
			}}
			/>
		</div>
		);
};

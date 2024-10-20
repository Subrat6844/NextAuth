"use client";
import { useEffect, useState } from "react";

export default function Home() {
	// const [circles, setCircles] = useState<any[]>([]);
	// const checkOverlap = (c1: any, c2: any) => {
	// 	const dx = c1.x - c2.x;
	// 	const dy = c1.y - c2.y;
	// 	const distance = Math.sqrt(dx * dx + dy * dy);
	// 	return distance < 100;
	// };
	// const getRandomColor = () => {
	// 	const letters = "0123456789ABCDEF";
	// 	let color = "#";
	// 	for (let i = 0; i < 6; i++) {
	// 		color += letters[Math.floor(Math.random() * 16)];
	// 	}
	// 	return color;
	// };
	// const clickEvent = (e: MouseEvent) => {
	// 	const newCircle = { x: e.clientX, y: e.clientY, bg: "blue" };
	// 	setCircles((prevCircles: any) => {
	// 		let updatedCircles = [...prevCircles];
	// 		for (let index = 0; index < prevCircles.length; index++) {
	// 			if (checkOverlap(prevCircles[index], newCircle)) {
	// 				const color = getRandomColor();
	// 				updatedCircles[index] = { ...prevCircles[index], bg: color };
	// 				newCircle.bg = color;
	// 			}
	// 		}
	// 		return [...updatedCircles, newCircle];
	// 	});
	// };
	// useEffect(() => {
	// 	document.addEventListener("click", clickEvent);
	// 	return () => {
	// 		document.removeEventListener("click", clickEvent);
	// 	};
	// }, []);
	return (
		<>
			{/* <div className="container">
				{circles.map((c, i) => (
					<div
						className="circle"
						key={i}
						style={{
							position: "absolute",
							top: `${c.y}px`,
							left: `${c.x}px`,
							width: 100,
							height: 100,
							background: c.bg,
							borderRadius: "50%",
							transform: "translate(-50%, -50%)",
						}}
					></div>
				))}
			</div> */}
			<h1>Page</h1>
		</>
	);
}

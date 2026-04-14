import React from 'react';
import {
	GroupSection,
	ProductsA,
	ContainerA,
	CubicleA,
	Item,
} from './group-display.style';
import { useNavigate } from 'react-router-dom';

function GroupDisplay({index, group, className = '' }) {
	const navigate = useNavigate();
	return (
		<GroupSection key={index} className={className}>
			<h1>{group?.groupName}</h1>

			{group?.shopItems?.length === 8 && (
				<ProductsA>
					<ContainerA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[0]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[0].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[0]?.name}</h3>
									<p>$ {group?.shopItems[0]?.price}</p>
								</div>
							</Item>

							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[1]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[1].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[1]?.name}</h3>
									<p>$ {group?.shopItems[1]?.price}</p>
								</div>
							</Item>
						</CubicleA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[2]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[2].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[2]?.name}</h3>
									<p>$ {group?.shopItems[2]?.price}</p>
								</div>
							</Item>

							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[3]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[3].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[3]?.name}</h3>
									<p>$ {group?.shopItems[3]?.price}</p>
								</div>
							</Item>
						</CubicleA>
					</ContainerA>

					<ContainerA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[4]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[4].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[4]?.name}</h3>
									<p>$ {group?.shopItems[4]?.price}</p>
								</div>
							</Item>
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[5]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[5].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[5]?.name}</h3>
									<p>$ {group?.shopItems[5]?.price}</p>
								</div>
							</Item>
						</CubicleA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[6]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[6].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[6]?.name}</h3>
									<p>$ {group?.shopItems[6]?.price}</p>
								</div>
							</Item>
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[7]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[7].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[7]?.name}</h3>
									<p>$ {group?.shopItems[7]?.price}</p>
								</div>
							</Item>
						</CubicleA>
					</ContainerA>
				</ProductsA>
			)}

			{group?.shopItems?.length === 5 && (
				<ProductsA>
					<ContainerA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[0]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[0]?.image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[0]?.name}</h3>
									<p>$ {group?.shopItems[0]?.price}</p>
								</div>
							</Item>
						</CubicleA>
					</ContainerA>

					<ContainerA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[1]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[1].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[1]?.name}</h3>
									<p>$ {group?.shopItems[1]?.price}</p>
								</div>
							</Item>
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[2]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[2]?.image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[2]?.name}</h3>
									<p>$ {group?.shopItems[2]?.price}</p>
								</div>
							</Item>
						</CubicleA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[3]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[3].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[3]?.name}</h3>
									<p>$ {group?.shopItems[3]?.price}</p>
								</div>
							</Item>

							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[4]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[4].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[4]?.name}</h3>
									<p>$ {group?.shopItems[4]?.price}</p>
								</div>
							</Item>
						</CubicleA>
					</ContainerA>
				</ProductsA>
			)}

			{group?.shopItems?.length === 2 && (
				<ProductsA>
					<ContainerA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[0]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[0].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[0]?.name}</h3>
									<p>$ {group?.shopItems[0]?.price}</p>
								</div>
							</Item>
						</CubicleA>
					</ContainerA>

					<ContainerA>
						<CubicleA $flex="1">
							<Item
								className=""
								onClick={() =>
									navigate(`/overview/${group?.shopItems[1]?._id}`)
								}
							>
								<div className="imageHolder rounded-[inherit]">
									<img src={group?.shopItems[1].image.url} alt="error" />
								</div>
								<div className="hoverTag">
									<h3>{group?.shopItems[1]?.name}</h3>
									<p>$ {group?.shopItems[1]?.price}</p>
								</div>
							</Item>
						</CubicleA>
					</ContainerA>
				</ProductsA>
			)}
		</GroupSection>
	);
}

export default GroupDisplay;

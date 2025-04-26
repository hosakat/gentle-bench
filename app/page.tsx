import Link from 'next/link';
import { Building, MapPin } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

// 百貨店のモックデータ
const departmentStores = [
	{
		id: 'isetan-shinjuku',
		name: '伊勢丹新宿店',
		address: '東京都新宿区新宿3-14-1',
		floors: 8,
		image: '/placeholder.svg?height=200&width=300',
	},
	{
		id: 'shinjuku-marui',
		name: '新宿マルイ',
		address: '東京都新宿区新宿3-30-13',
		floors: 9,
		image: '/shinjuku-marui/shinjuku-marui.jpg?height=200&width=300',
	},
	{
		id: 'takashimaya-nihonbashi',
		name: '高島屋日本橋店',
		address: '東京都中央区日本橋2-4-1',
		floors: 10,
		image: '/placeholder.svg?height=200&width=300',
	},
	{
		id: 'mitsukoshi-ginza',
		name: '三越銀座店',
		address: '東京都中央区銀座4-6-16',
		floors: 12,
		image: '/placeholder.svg?height=200&width=300',
	},
	{
		id: 'tobu-ikebukuro',
		name: '東武百貨店池袋店',
		address: '東京都豊島区西池袋1-1-25',
		floors: 11,
		image: '/placeholder.svg?height=200&width=300',
	},
	{
		id: 'daimaru-tokyo',
		name: '大丸東京店',
		address: '東京都千代田区丸の内1-9-1',
		floors: 13,
		image: '/placeholder.svg?height=200&width=300',
	},
];

export default function Home() {
	return (
		<div className="container mx-auto py-8 px-4">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-2">Gentle Bench</h1>
				<p className="text-muted-foreground">
					付き添いで疲れる優しい男たちを守る、
				</p>
				<p className="text-muted-foreground">
					お買い物の休憩に便利なベンチの場所がわかるアプリ
				</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				{departmentStores.map((store) => (
					<Link
						href={`/${store.id}`}
						key={store.id}
						className="transition-transform hover:scale-105"
					>
						<Card className="h-full">
							<CardHeader className="pb-2 px-4 pt-4">
								<CardTitle className="text-xl">{store.name}</CardTitle>
								<CardDescription className="flex items-center gap-1">
									<MapPin className="h-4 w-4" />
									{store.address}
								</CardDescription>
							</CardHeader>
							<CardContent className="px-4 pb-2">
								<div
									className="h-40 w-full bg-cover bg-center rounded-md"
									style={{ backgroundImage: `url(${store.image})` }}
								/>
							</CardContent>
							<CardFooter className="px-4 pb-4">
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Building className="h-4 w-4" />
									<span>{store.floors}フロア</span>
								</div>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}

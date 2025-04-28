import Link from 'next/link';
import { Building, MapPin, Sofa, ShoppingBag } from 'lucide-react';

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
			<header className="mb-10 text-center">
				<div className="flex justify-center mb-4">
					<div className="bg-primary/10 p-3 rounded-full">
						<Sofa className="h-10 w-10 text-primary" />
					</div>
				</div>
				<h1 className="text-3xl sm:text-4xl font-bold mb-3">Gentle Bench</h1>
				<p className="text-muted-foreground text-lg max-w-md mx-auto">
					お買い物の付き添いで疲れる優しい男たちの、
				</p>
				<p className="text-muted-foreground text-lg max-w-md mx-auto">
					休憩に便利なベンチの場所がわかるアプリ
				</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				{departmentStores.map((store) => (
					<Link
						href={`/${store.id}`}
						key={store.id}
						className="transition-transform hover:scale-105"
					>
						<Card className="h-full friendly-card border-primary/10 overflow-hidden">
							<div
								className="h-40 w-full bg-cover bg-center"
								style={{ backgroundImage: `url(${store.image})` }}
							/>
							<CardHeader className="pb-2 px-4 pt-4">
								<CardTitle className="text-xl">{store.name}</CardTitle>
								<CardDescription className="flex items-center gap-1 text-sm">
									<MapPin className="h-4 w-4 text-primary" />
									{store.address}
								</CardDescription>
							</CardHeader>
							<CardFooter className="px-4 pb-4 pt-0">
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Building className="h-4 w-4 text-primary/70" />
									<span>{store.floors}階建て</span>
									<span className="mx-1">•</span>
									<Sofa className="h-4 w-4 text-primary/70" />
									<span>ベンチあり</span>
								</div>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
			<footer className="mt-16 text-center text-sm text-muted-foreground">
				<div className="flex justify-center items-center gap-2 mb-2">
					<ShoppingBag className="h-4 w-4 text-primary" />
					<span>快適なお買い物をサポートします</span>
				</div>
				<p>© 2025 Gentle Bench</p>
			</footer>
		</div>
	);
}

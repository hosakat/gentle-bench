'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Sofa, MapPin, Building } from 'lucide-react';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FloorMap } from '@/components/floor-map';
import React from 'react';

// 百貨店のモックデータ
const departmentStores = [
	{
		id: 'isetan-shinjuku',
		name: '伊勢丹新宿店',
		address: '東京都新宿区新宿3-14-1',
		floors: 8,
		image: '/placeholder.svg?height=200&width=300',
		floorMaps: [
			{
				floor: 'B2',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B2F',
			},
			{
				floor: 'B1',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B1F',
			},
			{
				floor: '1F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=1F',
			},
			{
				floor: '2F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=2F',
			},
			{
				floor: '3F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=3F',
			},
			{
				floor: '4F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=4F',
			},
			{
				floor: '5F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=5F',
			},
			{
				floor: '6F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=6F',
			},
		],
	},
	{
		id: 'takashimaya-nihonbashi',
		name: '高島屋日本橋店',
		address: '東京都中央区日本橋2-4-1',
		floors: 10,
		image: '/placeholder.svg?height=200&width=300',
		floorMaps: [
			{
				floor: 'B2',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B2F',
			},
			{
				floor: 'B1',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B1F',
			},
			{
				floor: '1F',
				mapType: 'pdf',
				mapUrl: '/placeholder.svg?height=600&width=800&text=1F',
			},
			{
				floor: '2F',
				mapType: 'pdf',
				mapUrl: '/placeholder.svg?height=600&width=800&text=2F',
			},
			{
				floor: '3F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=3F',
			},
			{
				floor: '4F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=4F',
			},
			{
				floor: '5F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=5F',
			},
			{
				floor: '6F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=6F',
			},
			{
				floor: '7F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=7F',
			},
			{
				floor: '8F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=8F',
			},
		],
	},
	{
		id: 'mitsukoshi-ginza',
		name: '三越銀座店',
		address: '東京都中央区銀座4-6-16',
		floors: 12,
		image: '/placeholder.svg?height=200&width=300',
		floorMaps: [
			{
				floor: 'B3',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B3F',
			},
			{
				floor: 'B2',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B2F',
			},
			{
				floor: 'B1',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B1F',
			},
			{
				floor: '1F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=1F',
			},
			{
				floor: '2F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=2F',
			},
			{
				floor: '3F',
				mapType: 'pdf',
				mapUrl: '/placeholder.svg?height=600&width=800&text=3F',
			},
			{
				floor: '4F',
				mapType: 'pdf',
				mapUrl: '/placeholder.svg?height=600&width=800&text=4F',
			},
			{
				floor: '5F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=5F',
			},
			{
				floor: '6F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=6F',
			},
			{
				floor: '7F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=7F',
			},
			{
				floor: '8F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=8F',
			},
			{
				floor: '9F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=9F',
			},
		],
	},
	{
		id: 'shinjuku-marui',
		name: '新宿マルイ',
		address: '東京都新宿区新宿3-30-13',
		floors: 9,
		image: '/placeholder.svg?height=200&width=300',
		floorMaps: [
			{
				floor: 'B1',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-b1.png?height=600&width=800&text=B1F',
			},
			{
				floor: '1F',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-1f.png?height=600&width=800&text=1F',
			},
			{
				floor: '2F',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-2f.png?height=600&width=800&text=2F',
			},
			{
				floor: '3F',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-3f.png?height=600&width=800&text=3F',
			},
			{
				floor: '5F',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-5f.png?height=600&width=800&text=5F',
			},
			{
				floor: '6F',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-6f.png?height=600&width=800&text=6F',
			},
			{
				floor: '7F',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-7f.png?height=600&width=800&text=7F',
			},
			{
				floor: '8F',
				mapType: 'image',
				mapUrl:
					'/shinjuku-marui/shinjuku-marui-8f.png?height=600&width=800&text=7F',
			},
		],
	},
	{
		id: 'tobu-ikebukuro',
		name: '東武百貨店池袋店',
		address: '東京都豊島区西池袋1-1-25',
		floors: 11,
		image: '/placeholder.svg?height=200&width=300',
		floorMaps: [
			{
				floor: 'B2',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B2F',
			},
			{
				floor: 'B1',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B1F',
			},
			{
				floor: '1F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=1F',
			},
			{
				floor: '2F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=2F',
			},
			{
				floor: '3F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=3F',
			},
			{
				floor: '4F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=4F',
			},
			{
				floor: '5F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=5F',
			},
			{
				floor: '6F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=6F',
			},
			{
				floor: '7F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=7F',
			},
			{
				floor: '8F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=8F',
			},
			{
				floor: '9F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=9F',
			},
		],
	},
	{
		id: 'daimaru-tokyo',
		name: '大丸東京店',
		address: '東京都千代田区丸の内1-9-1',
		floors: 13,
		image: '/placeholder.svg?height=200&width=300',
		floorMaps: [
			{
				floor: 'B3',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B3F',
			},
			{
				floor: 'B2',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B2F',
			},
			{
				floor: 'B1',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=B1F',
			},
			{
				floor: '1F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=1F',
			},
			{
				floor: '2F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=2F',
			},
			{
				floor: '3F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=3F',
			},
			{
				floor: '4F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=4F',
			},
			{
				floor: '5F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=5F',
			},
			{
				floor: '6F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=6F',
			},
			{
				floor: '7F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=7F',
			},
			{
				floor: '8F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=8F',
			},
			{
				floor: '9F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=9F',
			},
			{
				floor: '10F',
				mapType: 'image',
				mapUrl: '/placeholder.svg?height=600&width=800&text=10F',
			},
		],
	},
];

export default function StorePage({ params }: { params: { storeId: string } }) {
	// const { storeId } = params;
	const { storeId } = React.use(params);
	const store = departmentStores.find((s) => s.id === storeId);

	if (!store) {
		notFound();
	}

	const [viewMode, setViewMode] = useState('tabs');
	const [selectedFloor, setSelectedFloor] = useState(store.floorMaps[0].floor);

	// 画面サイズに応じてビューモードを変更
	const handleResize = () => {
		if (typeof window !== 'undefined') {
			setViewMode(window.innerWidth < 640 ? 'dropdown' : 'tabs');
		}
	};

	// クライアントサイドでのみ実行
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', handleResize);
		// 初期ロード時にも実行
		if (viewMode === 'tabs' && window.innerWidth < 640) {
			setViewMode('dropdown');
		} else if (viewMode === 'dropdown' && window.innerWidth >= 640) {
			setViewMode('tabs');
		}
	}

	const currentFloorMap = store.floorMaps.find(
		(map) => map.floor === selectedFloor
	);

	return (
		<div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-5xl">
			<div className="mb-6 sm:mb-8">
				<Link
					href="/"
					className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-primary hover:text-primary/80 mb-4 friendly-button px-3 py-1 bg-primary/5 w-fit rounded-full"
				>
					<ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
					<span>百貨店一覧に戻る</span>
				</Link>

				<div className="flex items-start gap-3">
					<div className="bg-primary/10 p-2 rounded-full mt-1">
						<Building className="h-5 w-5 text-primary" />
					</div>
					<div>
						<h1 className="text-xl sm:text-2xl font-bold mb-1">{store.name}</h1>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<MapPin className="h-3 w-3 text-primary/70" />
							<span>{store.address}</span>
						</div>
					</div>
				</div>
			</div>

			<Card className="mb-6 friendly-card border-primary/10">
				<CardContent className="p-3 sm:p-5">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4">
						<div className="flex items-center gap-2 mb-3 sm:mb-0">
							<div className="bg-primary/10 p-1.5 rounded-full">
								<Sofa className="h-4 w-4 text-primary" />
							</div>
							<h2 className="text-lg sm:text-xl font-bold">フロアマップ</h2>
						</div>

						{viewMode === 'dropdown' ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="w-full text-sm sm:w-auto friendly-button"
									>
										{selectedFloor}階{' '}
										<ChevronDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-full rounded-xl">
									{store.floorMaps.map((map) => (
										<DropdownMenuItem
											key={map.floor}
											onClick={() => setSelectedFloor(map.floor)}
										>
											{map.floor}階
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Tabs
								defaultValue={selectedFloor}
								onValueChange={setSelectedFloor}
								className="w-full sm:w-auto"
							>
								<TabsList className="grid grid-flow-col auto-cols-fr overflow-x-auto h-8 text-xs sm:text-sm">
									{store.floorMaps.map((map) => (
										<TabsTrigger key={map.floor} value={map.floor}>
											{map.floor}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
						)}
					</div>

					{currentFloorMap && (
						<div className="mt-4">
							<FloorMap mapData={currentFloorMap} storeId={storeId} />
						</div>
					)}
				</CardContent>
			</Card>

			<div className="bg-primary/5 p-4 rounded-2xl mb-8">
				<h3 className="font-bold mb-3 flex items-center gap-2">
					<span className="bg-primary/10 p-1 rounded-full">
						<Sofa className="h-4 w-4 text-primary" />
					</span>
					ベンチの見方
				</h3>
				<div className="flex flex-wrap items-center gap-4 text-sm">
					<div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full">
						<div className="w-4 h-4 rounded-full bench-available"></div>
						<span>穴場</span>
					</div>
					<div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full">
						<div className="w-4 h-4 rounded-full bench-partially"></div>
						<span>少しは空いてるかも</span>
					</div>
					<div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full">
						<div className="w-4 h-4 rounded-full bench-unavailable"></div>
						<span>空いてたらラッキー</span>
					</div>
				</div>
			</div>
			<div className="text-center text-sm text-muted-foreground mt-8">
				<p>※ マップ上のマーカーをタップすると詳細が表示されます</p>
				<p>
					※ フロアレイアウトの変更により、ベンチの場所が変わる場合があります
				</p>
			</div>
		</div>
	);
}

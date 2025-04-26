'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
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
		<div className="container mx-auto py-4 px-3 sm:py-6 sm:px-4">
			<div className="mb-4 sm:mb-6">
				<Link
					href="/"
					className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground mb-2 sm:mb-4"
				>
					<ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
					<span>百貨店一覧に戻る</span>
				</Link>
				<h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
					{store.name}
				</h1>
				<p className="text-sm text-muted-foreground">{store.address}</p>
			</div>

			<Card className="mb-6">
				<CardContent className="p-2 sm:p-4">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4">
						<h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">
							フロアマップ
						</h2>

						{viewMode === 'dropdown' ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="w-full text-sm sm:w-auto"
									>
										{selectedFloor}階{' '}
										<ChevronDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-full">
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
											{map.floor}階
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

			<div className="bg-muted p-4 rounded-lg">
				<h3 className="font-medium mb-2">ベンチの見方</h3>
				<div className="flex items-center gap-4 text-sm">
					<div className="flex items-center gap-1">
						<div className="w-4 h-4 rounded-full bg-green-500"></div>
						<span>穴場</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="w-4 h-4 rounded-full bg-yellow-500"></div>
						<span>少しは空いてるかも</span>
					</div>
					<div className="flex items-center gap-1">
						<div className="w-4 h-4 rounded-full bg-red-500"></div>
						<span>空いてたらラッキー</span>
					</div>
				</div>
			</div>
		</div>
	);
}

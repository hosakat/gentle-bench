'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, RotateCw, X, Building } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';

interface FloorMapProps {
	mapData: {
		floor: string;
		mapType: 'image' | 'pdf';
		mapUrl: string;
	};
	storeId: string;
}

interface BenchData {
	id: number;
	type: 'chair' | 'bench' | 'table';
	status: 'available' | 'unavailable' | 'partially';
	seats: number;
	crowdLevel: 'low' | 'medium' | 'high';
	nearbyFacilities?: string[];
}

export function FloorMap({ mapData, storeId }: FloorMapProps) {
	const [zoom, setZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [openBenchId, setOpenBenchId] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	// 画面サイズの検出
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};

		// 初期チェック
		checkMobile();

		// リサイズイベントのリスナー
		window.addEventListener('resize', checkMobile);

		// クリーンアップ
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	// モバイル用の初期ズーム設定
	useEffect(() => {
		if (isMobile) {
			setZoom(0.9); // モバイルでは少し縮小して全体を見やすく
		} else {
			setZoom(1);
		}
	}, [isMobile]);

	const handleZoomIn = () => {
		if (zoom < 2) {
			setZoom(zoom + 0.1);
		}
	};

	const handleZoomOut = () => {
		if (zoom > 0.3) {
			setZoom(zoom - 0.1);
		}
	};

	const handleRotate = () => {
		setRotation((rotation + 90) % 360);
	};

	const handleBenchClick = (benchId: number) => {
		if (openBenchId === benchId) {
			setOpenBenchId(null); // Close if already open
		} else {
			setOpenBenchId(benchId); // Open the clicked bench tooltip
		}
	};

	// ベンチの種類に応じた名前を取得
	const getBenchTypeName = (type: BenchData['type']) => {
		switch (type) {
			case 'chair':
				return 'イス';
			case 'bench':
				return 'ベンチ';
			case 'table':
				return 'テーブル';
			default:
				return 'ベンチ？';
		}
	};

	// // ベンチの状態に応じた色を取得
	// const getBenchStatusColor = (status: BenchData['status']) => {
	// 	switch (status) {
	// 		case 'available':
	// 			return 'bg-green-500';
	// 		case 'unavailable':
	// 			return 'bg-red-500';
	// 		case 'partially':
	// 			return 'bg-yellow-500';
	// 		default:
	// 			return 'bg-gray-500';
	// 	}
	// };

	// ベンチの混雑見込に応じた色を取得
	const getBenchLevelColor = (level: BenchData['crowdLevel']) => {
		switch (level) {
			case 'low':
				return 'bg-green-500';
			case 'medium':
				return 'bg-yellow-500';
			case 'high':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	};

	// 混雑レベルのテキストを取得
	const getCrowdLevelText = (level: BenchData['crowdLevel']) => {
		switch (level) {
			case 'low':
				return '穴場';
			case 'medium':
				return '少しは空いてるかも';
			case 'high':
				return '空いてたらラッキー';
			default:
				return '不明';
		}
	};

	// フロアごとのベンチデータを取得
	const getBenchesForFloor = (
		floor: string
	): (BenchData & { position: { top: string; left: string } })[] => {
		if (storeId === 'shinjuku-marui') {
			if (floor === 'B1') {
				return [
					{
						id: 1,
						type: 'table',
						status: 'available',
						seats: 3,
						crowdLevel: 'low',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '40%', left: '55%' },
					},
					{
						id: 2,
						type: 'table',
						status: 'available',
						seats: 2,
						crowdLevel: 'low',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '48%', left: '55%' },
					},
					{
						id: 3,
						type: 'table',
						status: 'available',
						seats: 2,
						crowdLevel: 'low',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '44%', left: '60%' },
					},
				];
			} else if (floor === '3F') {
				return [
					{
						id: 1,
						type: 'chair',
						status: 'available',
						seats: 6,
						crowdLevel: 'high',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '51%', left: '55%' },
					},
					{
						id: 2,
						type: 'bench',
						status: 'available',
						seats: 2,
						crowdLevel: 'low',
						nearbyFacilities: ['エレベーター'],
						position: { top: '71%', left: '57%' },
					},
				];
			} else if (floor === '5F') {
				return [
					{
						id: 1,
						type: 'bench',
						status: 'available',
						seats: 3,
						crowdLevel: 'high',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '38%', left: '60%' },
					},
					{
						id: 2,
						type: 'bench',
						status: 'unavailable',
						seats: 2,
						crowdLevel: 'high',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '44%', left: '60%' },
					},
					{
						id: 3,
						type: 'bench',
						status: 'unavailable',
						seats: 3,
						crowdLevel: 'high',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '49%', left: '60%' },
					},
				];
			} else if (floor === '6F') {
				return [
					{
						id: 1,
						type: 'bench',
						status: 'available',
						seats: 6,
						crowdLevel: 'high',
						nearbyFacilities: ['エレベーター'],
						position: { top: '75%', left: '56%' },
					},
				];
			} else if (floor === '8F') {
				return [
					{
						id: 1,
						type: 'bench',
						status: 'available',
						seats: 3,
						crowdLevel: 'medium',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '36%', left: '57%' },
					},
					{
						id: 2,
						type: 'bench',
						status: 'available',
						seats: 3,
						crowdLevel: 'medium',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '43%', left: '57%' },
					},
					{
						id: 3,
						type: 'bench',
						status: 'available',
						seats: 3,
						crowdLevel: 'medium',
						nearbyFacilities: ['エスカレーター'],
						position: { top: '50%', left: '57%' },
					},
				];
			}
		}
		return [];
	};

	// ベンチ情報のコンテンツ
	const BenchInfoContent = ({ bench }: { bench: BenchData }) => (
		<div className="space-y-2">
			<div className="font-bold border-b pb-1 flex justify-between items-center">
				<span>
					{getBenchTypeName(bench.type)} #{bench.id}
				</span>
			</div>
			<div className="grid grid-cols-2 gap-x-2 text-sm">
				<span className="text-muted-foreground">定員:</span>
				<span>{bench.seats}人</span>
				<span className="text-muted-foreground">混雑見込:</span>
				<span>{getCrowdLevelText(bench.crowdLevel)}</span>
				{bench.nearbyFacilities && bench.nearbyFacilities.length > 0 && (
					<>
						<span className="text-muted-foreground">近くの設備:</span>
						<span>{bench.nearbyFacilities.join(', ')}</span>
					</>
				)}
			</div>
		</div>
	);

	const benches = getBenchesForFloor(mapData.floor);

	// マーカーサイズの計算（モバイルでは大きめに）
	const markerSize = isMobile ? 'w-8 h-8' : 'w-6 h-6';
	const markerFontSize = isMobile ? 'text-sm' : 'text-xs';

	return (
		<div className="flex flex-col">
			<div className="flex justify-end gap-1 sm:gap-2 mb-2">
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 sm:h-9 sm:w-9"
					onClick={handleZoomIn}
				>
					<ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
					<span className="sr-only">拡大</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 sm:h-9 sm:w-9"
					onClick={handleZoomOut}
				>
					<ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
					<span className="sr-only">縮小</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 sm:h-9 sm:w-9"
					onClick={handleRotate}
				>
					<RotateCw className="h-3 w-3 sm:h-4 sm:w-4" />
					<span className="sr-only">回転</span>
				</Button>
			</div>

			<div className="overflow-auto border rounded-lg bg-background p-1 sm:p-2 h-[50vh] sm:h-[70vh]">
				<div
					className="relative w-full h-full flex items-center justify-center transition-all duration-300"
					style={{
						transform: `scale(${zoom}) rotate(${rotation}deg)`,
					}}
				>
					{mapData.mapType === 'image' ? (
						<Image
							src={mapData.mapUrl || '/placeholder.svg'}
							alt={`${mapData.floor}階フロアマップ`}
							width={800}
							height={600}
							className="object-contain"
							priority
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center">
							<iframe
								src={mapData.mapUrl}
								title={`${mapData.floor}階フロアマップ`}
								className="w-full h-full border-0"
							/>
						</div>
					)}

					{/* ベンチの位置をマップ上に表示 */}
					{benches.map((bench) => (
						<div key={bench.id}>
							{/* デスクトップ向け: ホバーでツールチップ表示（モバイルでは非表示） */}
							{!isMobile && (
								<div className="hidden sm:block">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<div
													className={`absolute ${markerSize} rounded-full ${getBenchLevelColor(
														bench.crowdLevel
													)} border-2 border-white flex items-center justify-center text-white font-bold cursor-pointer transition-transform hover:scale-110 ${markerFontSize}`}
													style={{
														top: bench.position.top,
														left: bench.position.left,
													}}
													onClick={() => handleBenchClick(bench.id)}
												>
													{bench.id}
												</div>
											</TooltipTrigger>
											<TooltipContent
												side="top"
												className="bg-white p-3 rounded-lg shadow-lg z-50 max-w-xs"
											>
												<BenchInfoContent bench={bench} />
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							)}

							{/* すべてのデバイス向け: クリックでポップオーバー表示 */}
							<Popover
								open={openBenchId === bench.id}
								onOpenChange={(open) => !open && setOpenBenchId(null)}
							>
								<PopoverTrigger asChild>
									<div
										className={`absolute ${markerSize} rounded-full ${getBenchLevelColor(
											bench.crowdLevel
										)} border-2 border-white flex items-center justify-center text-white font-bold cursor-pointer transition-transform active:scale-95 ${
											openBenchId === bench.id
												? 'ring-2 ring-offset-2 ring-primary'
												: ''
										} ${markerFontSize}`}
										style={{
											top: bench.position.top,
											left: bench.position.left,
										}}
										onClick={() => handleBenchClick(bench.id)}
									>
										{bench.id}
									</div>
								</PopoverTrigger>
								<PopoverContent
									side={isMobile ? 'bottom' : 'top'}
									align="center"
									className="bg-white p-3 rounded-lg shadow-lg z-50 max-w-[280px] sm:max-w-xs"
									sideOffset={isMobile ? 5 : 8}
								>
									<div className="flex justify-between items-center mb-2">
										<h3 className="font-bold text-sm sm:text-base">
											ベンチ情報
										</h3>
										<Button
											variant="ghost"
											size="icon"
											className="h-5 w-5"
											onClick={() => setOpenBenchId(null)}
										>
											<X className="h-3 w-3" />
											<span className="sr-only">閉じる</span>
										</Button>
									</div>
									<BenchInfoContent bench={bench} />
								</PopoverContent>
							</Popover>
						</div>
					))}
				</div>
			</div>

			<div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
				<p>
					※
					マップ上の数字はベンチの位置を示しています。タップすると詳細が表示されます。
				</p>
				<p>※ 混雑状況により、ベンチの利用可否が変わる場合があります。</p>
			</div>
		</div>
	);
}

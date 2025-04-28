import type React from 'react';
import '@/app/globals.css';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
	title: '百貨店ベンチマップ',
	description: '百貨店内のベンチの場所を簡単に探せるアプリ',
	generator: 'v0.dev',
};

const mplus = M_PLUS_Rounded_1c({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-mplus',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className={`${mplus.variable} font-sans`}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}

export const dynamic = 'force-dynamic';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#e5e3db] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-retroBlue mb-4">404 - Page Not Found</h1>
                <p className="text-xl text-retroBlue/60">The page you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        </div>
    );
}
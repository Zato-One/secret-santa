type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function RevealPage({ params }: PageProps) {
  const { code } = await params;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Secret Santa Reveal</h1>
      <p className="text-gray-600">
        Encrypted code: {code}
      </p>
    </div>
  );
}

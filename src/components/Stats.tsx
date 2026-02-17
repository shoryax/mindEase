export default function Stats() {
  const stats = [
    { value: '2.5k+', label: 'people helped' },
    { value: '5yr', label: 'experience' },
    { value: '4.9', label: 'avg rating' },
    { value: '100%', label: 'confidential' }
  ];

  return (
    <section className="relative z-10 px-6 lg:px-12 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="text-5xl lg:text-6xl font-light mb-2 text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

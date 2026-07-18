function Stats() {
  const statsData = [
    {
      label: "Total Orders",
      value: "29.6M",
      description: "21% More Than Last Month",
    },
    {
      label: "Total Reviews",
      value: "906K",
      description: "48% More Than Last Month",
    },
    {
      label: "Active Bikes",
      value: "132+",
      description: "31 More Will come",
    },
  ];

  return (
    <section className="w-full bg-[#8344FF] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-16">
          Trusted By Millions, Here For You
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="text-white/70 text-sm font-medium mb-2">
                {stat.label}
              </p>
              <h3 className="text-white text-5xl md:text-6xl font-extrabold mb-2">
                {stat.value}
              </h3>
              <p className="text-white/60 text-xs">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
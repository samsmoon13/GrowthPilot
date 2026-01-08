export function SimpleFooter() {
  return (
    <footer className="bg-[#3d2817] text-[#faf9f7] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Project Info */}
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-2">GrowthPilot</h3>
            <p className="text-sm text-[#faf9f7]/80">
              AI-powered knowledge collaboration platform
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-right">
            <p className="text-sm mb-1">
              <span className="text-[#faf9f7]/80">Email:</span>{' '}
              <a 
                href="mailto:contact@growthpilot.com" 
                className="text-[rgb(213,192,93)] hover:underline"
              >
                contact@growthpilot.com
              </a>
            </p>
            <p className="text-sm text-[#faf9f7]/80">
              © {new Date().getFullYear()} GrowthPilot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

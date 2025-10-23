import { jobSeekerFeatures, employerFeatures } from "../../utils/data";
const Features = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 md:text-5xl text-secondary-900">
            Mọi thứ bạn cần để
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent pb-2">
              Thành công
            </span>
          </h2>
          <p className="text=xl text-secondary-600 max-w-3xl mx-auto">
            Dù bạn là người tìm việc hay nhà tuyển dụng, chúng tôi đều có các
            tính năng để hỗ trợ bạn. Khám phá các công cụ mạnh mẽ của chúng tôi
            giúp bạn đạt được mục tiêu nghề nghiệp hoặc tuyển dụng hiệu quả.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-secondary-900 mb-4">
                Dành cho người tìm việc
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full" />
            </div>
            <div className="space-y-8">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 rounded-2xl hover:bg-primary-50 transition-all p-6 duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center  bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors duration-300 justify-center">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-secondary-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-secondary-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-secondary-900 mb-4">
                Dành cho nhà tuyển dụng
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary-500 to-secondary-600 mx-auto rounded-full" />
            </div>
            <div className="space-y-8">
              {employerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 rounded-2xl hover:bg-secondary-50 transition-all p-6 duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center  bg-secondary-100 rounded-xl group-hover:bg-secondary-200 transition-colors duration-300 justify-center">
                    <feature.icon className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-secondary-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-secondary-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

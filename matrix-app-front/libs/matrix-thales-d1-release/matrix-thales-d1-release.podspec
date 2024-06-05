require "json"
package = JSON.parse(File.read(File.join(__dir__, "../matrix-thales-d1/package.json")))

Pod::Spec.new do |s|
  s.name         = package["name"] + "-release"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.source       = { :git => "https://github.com/neyseo/matrix-thales-d1-release.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.vendored_framework = 'D1/Release/D1.xcframework', 'D1/Release/D1Core.xcframework',  'D1/Release/TPCSDKSwift.xcframework'
end
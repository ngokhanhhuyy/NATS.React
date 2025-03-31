import { getAboutUsIntroductionAsync } from "@/services/aboutUsIntroductionService";
import { getMemberListAsync } from "@/services/memberService";
import { getCertificateListAsync } from "@/services/certificateService";
import { createAboutUsIntroductionDetailModel } from "@/models/aboutUsIntroductionModels";
import { createMemberDetailModel } from "@/models/memberModels";
import { createCertificateDetailModel } from "@/models/certificateModels";
import { useAsyncModelInitializer } from "@/hooks/asyncModelInitializerHook";

// Child components.
import Content from "./Content";
import MemberList from "./MemberList";
import CertificateList from "./CertificateList";

// Type.
type Model = {
	aboutUsIntroduction: AboutUsIntroductionDetailModel;
	members: MemberDetailModel[];
	certificates: CertificateDetailModel[];
};

// Component.
export default function AboutUsPage() {
	// State.
	const model = useAsyncModelInitializer<Model>("aboutUsIntroductionPage", async () => {
		const [aboutUsResponseDto, memberResponseDtos, certificateResponseDtos] =
			await Promise.all([
				getAboutUsIntroductionAsync(),
				getMemberListAsync(),
				getCertificateListAsync(),
			]);

		return {
			aboutUsIntroduction: createAboutUsIntroductionDetailModel(aboutUsResponseDto),
			members: memberResponseDtos.map((dto) => createMemberDetailModel(dto)),
			certificates: certificateResponseDtos.map((dto) => createCertificateDetailModel(dto)),
		};
	});

	return (
		<div className="container p-4 py-5">
			<div className="row justify-content-center px-3 py-3 mb-4">
				<div className="col col-xl-6 col-lg-7 col-md-8 col-12 order-lg-0 order-1">
					<img
						src={model.aboutUsIntroduction.thumbnailUrl}
						className="w-100 rounded-4 shadow"
						alt="Về chúng tôi"
					/>
				</div>
			</div>

			<div className="row gx-5 gy-3 justify-content-center">
				{/* AboutUsContent */}
				<Content model={model.aboutUsIntroduction.aboutUsContent} title="Về chúng tôi" />

				{/* WhyChooseUsContent */}
				<Content
					model={model.aboutUsIntroduction.whyChooseUsContent}
					title="Tại sao chọn chúng tôi"
				/>

				{/* OurDifferenceContent */}
				<Content
					model={model.aboutUsIntroduction.ourDifferenceContent}
					title="Sự khác biệt của chúng tôi"
				/>

				{/* OurCultureContent */}
				<Content
					model={model.aboutUsIntroduction.ourCultureContent}
					title="Văn hoá của chúng tôi"
				/>
			</div>

			{/* Members */}
			<div className="row gx-5 gy-3 justify-content-center mt-2">
				<MemberList model={model.members} />
			</div>

			<CertificateList model={model.certificates} />
		</div>
	);
}

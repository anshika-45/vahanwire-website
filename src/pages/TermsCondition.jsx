import React, { Suspense } from "react";
import termsConditionBanner from "../assets/termcondition-banner.webp";
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const PageBanner = React.lazy(() => import("../components/PageBanner"));
const TwoColumnInfoLayout = React.lazy(() => import("../components/TwoColumnInfoLayout"));

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-[#F4F4F4] rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);

const TermsCondition = () => {
  const sections = [
    {
      title: "Use of Website and/or Application",
      content: [
        "You hereby represent and warrant that you are at least eighteen (18) years of age or above and are capable of entering, performing and adhering to these terms and conditions and that you agree to be bound by these terms and conditions.",

        "Vahanwire reserves the right to terminate User’s access to and refuse to provide User with access to the Website and/or Application if Vahanwire discovers that user is under the age of 18 years. Furthermore, Vahanwire has the right at its sole discretion to refuse to provide access to or terminate the access of any person(s) whatsoever with or without notice.",

        "Vahanwire reserves the right, at its sole discretion, to amend/modify the Website and/or Application or Services or these terms and conditions, at any time and without prior notice to the User/Service Provider. Your continued use of the Website and/or Application shall constitute your acceptance of revised or modified terms and conditions or Services. Your access to the Website and/or Application for purchasing the services or registering as a Service Provider is subject to the most current version of the terms and conditions.",
      ],
    },
    {
      title: "Website and/or Application",
      content: [
        "The Service Provider shall be responsible for honoring the bookings and making available the automotive services reserved by the User through the Website and/or Application. Upon completion of the booking by the User on the Website and/or Application, you agree and understand that you would be subject to customary terms of the Service Provider and you agree to accept any such terms, conditions, rules and restrictions associated with such services imposed by the Service Provider. You acknowledge and agree that you will be responsible for performing the obligations of any such agreements. Vahanwire is not responsible for the services’ descriptions or postings listed on the Website and/or Application. It is the User’s responsibility to check the details of the services listed on the Website and/or Application at its sole discretion.",

        "Website and/or Application shall specify the price at which the services can be booked and facilities that would be made available. Vahanwire as well as the Service Provider has the right to confirm or reject the booking.",

        "Any cancellation by the User is a subject to Cancellation and Refund Policy of Vahanwire.",
      ],
    },
    {
      title: "Use of  The Website and/or Application",
      content: [
        "The User agrees, acknowledges, confirms and undertakes that the registration data, information/data provided or uploaded onto the Website/ Application by the User: (a) shall not be false, inaccurate, misleading or incomplete; or (b) shall not be fraudulent or involve the use of counterfeit or stolen Credit Cards; or (c) shall not infringe any third party's intellectual property, trade secret or other proprietary rights or rights of publicity or privacy; or (d) shall not be defamatory, libellous, unlawfully threatening or unlawfully harassing; or (e) shall not contain any viruses, Trojan horses, or other computer programming routines or executable files that may damage, detrimentally interfere with, surreptitiously intercept or expropriate any system, data or personal information of any person whatsoever; or (f) shall not create liability for Vahanwire or cause Vahanwire to lose (in whole or in part) the services of Vahanwire’ ISPs or other service providers/suppliers. If the User contravenes the foregoing or Vahanwire has reasonable grounds to suspect that the User has contravened the foregoing, Vahanwire has the right to indefinitely deny or terminate User's access to the Website/ Application and to refuse to honor the User's request(s).",
      ],
    },
    {
      title: "Cookie Policy",
      content: [
        "User of the Website and/or Application may accept or decline the cookies when they access Vahanwire’ Website and/or Application. It is the user’s responsibility to set his browser to alert him to accept or to reject cookies.",
      ],
    },
    {
      title: "Payment Process",
      content: [
        "Vahanwire uses third party as well as an in house payment gateway, Vahan Money to receive payments from the User of the Website and/or Application. Vahanwire shall not be responsible for delays or erroneous transaction execution or cancellation of reservation due to payment issues. Vahanwire takes utmost care to work with third party payment providers, but does not control their systems, processes, technology and work flows, hence cannot be held responsible for any fault at the end of payment providers.",
      ],
    },
    {
      title: " Compliance with Laws",
      content: [
        "User of the Website and/or Application and Vahanwire shall comply with all the applicable laws applicable to them.",
      ],
    },
    {
      title: "Indemnification",
      content: [
        "Without prejudice to and in addition to any other remedies, reliefs or legal recourses available to Vahanwire herein or any applicable laws or otherwise, User agrees to indemnify, defend and hold Vahanwire harmless including but not limited to its affiliate, agents and employees from and against any and all losses, liabilities, claims, damages, demands, costs and expenses (including legal fees and disbursements in connection therewith and interest chargeable thereon) asserted against or incurred by Vahanwire that arise out of or related to your use or misuse of the of the Website, any violation by you of these terms and conditions, or any breach of representations, warranties and covenants made by you here in.",
      ],
    },
    {
      title: " Limitation of Liability",
      content: [
        "Vahanwire shall not be liable for any damages of any kind whatsoever including but not limited to direct, indirect, incidental, punitive, exemplary and consequential damages, damages for loss of use, data or profits, or other intangible losses, which may arise or are arising from the use of this Website and/or Application or any of the services offered, regardless of whether such damages are based on contract, tort, negligence, strict liability or otherwise, and even if Vahanwire has been advised of the possibility of damages.",

        "Not with standing anything to the contrary contained herein or elsewhere, Vahanwire's entire liability to the User for any claim arising out of availing the services from the website and/or application shall be limited to the amount equivalent to the price paid for the product and services giving rise to such claim.",
      ],
    },
    {
      title: " Intellectual Property ",
      content: [
        "Unless otherwise indicated, Vahanwire owns all intellectual property rights to and into the Website and/or Application, including without limitation, any and all rights, title and interest in and to copyright, related rights, patents, trademarks, trade names, service marks, designs, trade secrets, source code, meta tags, databases, graphics, content, icons and hyperlinks. You acknowledge and agree that you shall not use, reproduce, or distribute any content from the Website and/or Application belonging to Vahanwire without written consent of Vahanwire.",
      ],
    },
    {
      title: " Jurisdiction ",
      content: [
        "These terms and conditions and Services pursuant to the use of the Website and/or Application, and all transactions entered into on or through Website/ Application shall be governed by the laws of India and any disputes relating to the terms and conditions and/or Services shall be subject to the exclusive jurisdiction of the courts at New Delhi, India.",
      ],
    },
    {
      title: " Third Party Links ",
      content: [
        "The Website and/or Application may contain links to third-party websites or resources. You acknowledge and agree that Vahanwire shall not be responsible or liable for the correctness or accuracy of information available on such third-party websites or resources. The use of the Website and/or Application is requested to verify the accuracy of all information on their own before undertaking any reliance on such websites or resources.",
      ],
    },
    {
      title: " Personal Information ",
      content: [
        "You hereby consent to Vahanwire, during your initial registration process and from time to time making all such queries and/or taking all such steps in respect of your information as Vahanwire may be lawfully entitled to do from time to time. Vahanwire will not sell or rent your Personal Information to third parties for marketing purposes without your consent. By agreeing to this you expressly consent to us using your Personal Information to communicate with you and (unless you opt out on the Website and/or Application) to send you marketing and promotional articles. The manner in which we use your Personal Information is regulated in more detail as described in our Privacy Policy. Please read our Privacy Policy to acquaint yourself with your rights and obligations in this regard.",
      ],
    },
    {
      title: " Security ",
      content: [
        "To become a User, you will be required to select and provide us with your mobile number and a password which will enable you to sign into Vahanwire on the Website (www.vahanwire.com) or Application. You will also be given a starting PIN. It is your responsibility, and you agree, to keep your username, password and PIN secure and confidential at all time. You shall be fully responsible for all activities that occur under your username, password and PIN. You agree that your username, password and PIN will only be used for your own personal use and will not be disclosed to any other person, and that you will not enable any other person to access your profile.",

        "You acknowledge that if a third party becomes aware of your username, password and/or PIN, such person may gain access to all the services associated with Vahanwire. Vahanwire cannot and will not be liable for any loss, claim or damage you suffer or incur arising from and/or as a result of the use, whether authorized or unauthorized, of your username, password and/or PIN or. Should you forget, or for any other reason need to reset, your username, password and/or PIN, you can follow the process provided on the Website and/or Application. Should you still encounter problems, please contact us on  amc@vahanwire.com or calling 01203221368. You should immediately notify us if you believe there has been an unauthorized transaction or unauthorized access to your account; there is an error in your account history statement (you can access your account history by logging into your account on our Website and or Application) or in your transaction confirmation sent to you by email; your password has been compromised; you need more information about a transaction listed on the statement or transaction confirmation.",

        "Vahanwire stores and processes your Personal Information on computers that are located in the Indian subcontinent protected by physical and technological security devices. We take all reasonable steps to ensure the integrity and security of the Website, Mobile App and all back-office applications.",
      ],
    },
    {
      title: " Prohibited Conduct ",
      content: [
        "You agree to use Vahanwire in accordance with the Website and/or Application, and all applicable laws, regulations and ordinances. In particular, you undertake not to engage in any of the following prohibited conduct:",

        "Threatening, stalking, defrauding, inciting, harassing, or advocating the harassment of another person, User, or otherwise interfering with another person’s use of Vahan Money, the Website and/or Application; submitting false, inaccurate, incomplete, outdated or misleading information on the Website and/or Application; using the Website or the Mobile App to conduct fraudulent or illegal activities (including illegal gambling or gaming activities); delivering or attempting to deliver any damaging code to the Website and/or Application, or attempting to gain unauthorized access to any page on the Website or Mobile App; or removing or modifying any copyright, trademark or other proprietary rights notice on the Website/Application, or on any materials printed or copied off of the Website and/or Application.",

        "You acknowledge that if you breach any of the conditions set out in above, Vahanwire may incur substantial damages. Accordingly, in the event of a breach: your access may be limited, suspended or immediately terminated; you may be subject to criminal prosecution; you will be liable for any damages we incur, including without limitation all costs, expenses, and fines levied on Vahanwire by third parties such as payment processors and/or service providers as a result of your breach. You agree that, if either you or Vahanwire commence litigation or arbitration in connection with this paragraph the prevailing party shall be entitled to recover lawyers’ fees and any other costs reasonably incurred in such proceeding on the attorney and own-client scale, in addition to any other relief to which the prevailing party may be entitled. ",
      ],
    },
    {
      title: " Involvement in Disputes ",
      content: [
        "Vahanwire is not obliged, to get involved in any dispute between you and a Service Provider or any other User in an attempt to resolve same as well as to take all steps it deems reasonably necessary to combat suspected fraud. All risks associated with the automotive services will be solely that of the Service Provider and not Vahanwire. Also, all disputes regarding quality, merchantability, non-delivery, delay in delivery, misdemeanor, or otherwise will be directly between the Service Provider and the User without making Vahanwire, a party to such disputes.",
      ],
    },
    {
      title: "  Force Majeure ",
      content: [
        "Neither Vahanwire nor you shall be liable to the other for any delay or failure in performance under the Terms of Use, other than payment obligations, arising out of a cause beyond its control and without its fault or negligence. Such causes may include, but are not limited to fires, floods, earthquakes, strikes, unavailability of necessary utilities, blackouts, acts of God, acts of declared or undeclared war, acts of regulatory agencies, or national disasters.",
      ],
    },
    {
      title: " Redressal of Grivances ",
      content: [
        "Sending a request in through email at amc@vahanwire.com or calling 01203221368 signed with electronic signature identifying the content alleged to be in infringement of your rights as the rightful owner or affecting you prejudicially; providing your contact information including email, address, and telephone number where you can be contacted if required.",
      ],
    },
    {
      title: " Annual Maintenance Contract (AMC) Terms",
      content: [
        "The Annual Maintenance Contract (AMC) plan will be activated upon successful payment, with its validity starting from 20th  August 2025 or the date of confirmation by Vahanwire, whichever is later. Confirmation of activation will be communicated through the website and/or application. AMC plans cover vehicle maintenance services as outlined in the selected package, with limitations based on service count, vehicle type (car or bike), and geographical zones specified in the plan. Services are currently limited to designated operational zones (e.g., Delhi NCR), and users residing outside these zones will not be eligible for AMC service delivery. If an AMC is purchased from a non-serviceable area, it will remain in a pending activation state until the zone becomes active, and users may submit a callback request to express interest. AMC plans are strictly non-transferable and non-refundable, unless explicitly stated under a promotional offer or permitted by Vahanwire support. Users will receive automated reminders before their AMC plan expires, and auto-renewal settings can be managed via user profile settings. Vahanwire reserves the right to modify, suspend, or terminate any AMC plan or its terms at its sole discretion, including in cases of fraud, misuse, or regulatory changes, with prior notice to affected users.",
      ],
    },
    {
      title: "Disclaimer of Warranties",
      content: [
        "You agree that your use of the website shall be at your own risk. To the fullest extent permitted by law, and Vahanwire and its officers, managers, members, directors, employees, successors, assigns, subsidiaries, affiliates, service professionals, suppliers, and agents disclaim all warranties, express, implied, statutory or otherwise, and make no warranties, representations, or guarantees in connection with this website and/or application, the services offered on or through this website and/or application, any data, materials, submitted content, relating to the quality, suitability, truth, accuracy or completeness of any information or material contained or presented on this website and/or application, including without limitation the materials, data and submitted content of other users of this site or other third parties. Unless otherwise explicitly stated, to the maximum extent permitted by applicable law, this website and/or application, the services offered on or through this website and/or application, data, materials, submitted content, and any information or material contained or presented on this website and/or application is provided to you on an as is as available and where is basis with no warranty of implied warranty of merchantability, fitness for a particular purpose, or non-infringement of third-party rights. Vahanwire does not provide any warranties against errors, mistakes, or inaccuracies of data, content, information, materials, substance of the website and or application or submitted content, any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein, any bugs, viruses, trojan horses, or the like which may be transmitted to or through the website and/or application by any third party, any interruption or cessation of transmission to or from the website and/or application, any defamatory, offensive, or illegal conduct of any third party or service user or service provider, or any loss or damage of any kind incurred as a result of the use of any data, content, information, materials, substance of the website or submitted content posted, emailed, transmitted, or otherwise made available via the website. Vahanwire does not endorse, warrant, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the website or any hyperlinked site or featured in any banner or other advertisement. Vahanwire will not be a party to or in any way be responsible for monitoring any transaction between you and any party, including third party service professionals of products or services. As with the use of any service, and the publishing or posting of any material through any medium or in any environment, you should use your best judgment and exercise caution where appropriate.",
      ],
    },
    {
      title: "Limitations of Liability",
      content: [
        "In no event shall Vahanwire, or its respective officers, managers, members, directors, employees, successors, assigns, subsidiaries, affiliates, service professionals, suppliers, attorneys or agents, be liable to you for any direct, indirect, incidental, special, punitive, consequential or exemplary damages (including but not limited to loss of business, revenue, profits, use, data or other economic advantage) whatsoever resulting from any (i) access to or use of the website or any services offered by any service professionals via the website and/or application, including services provided pursuant to an agreement formed independently of the website and/or application, whether or not an agreement for service formed via the website and/or application is in effect; (ii) errors, mistakes, or inaccuracies of data, marks, content, information, materials or substance of the website and/or application or submitted content; (iii) any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein; (iv) any bugs, viruses, trojan horses, or the like which may be transmitted to or through the website and/or application by any third party; (v) any interruption or cessation of transmission to or from the website and/or application; (vi) any errors or omissions in any data, content, information, materials or substance of the website and/or application or submitted content; (vii) any failed negotiations for a service, any disputes that arise during or after the negotiation of a service or the formation of a contract for a service, or any other dispute that arises between users of the website and/or application; (viii) any defamatory, offensive, or illegal conduct of any third party or service user or service professional; or (ix) any use of any data, marks, content, information, materials or substance of the website or submitted content posted, emailed, transmitted, or otherwise made available on or through the website and/or application, whether based on warranty, contract, tort (including negligence), or any other legal theory, and whether or not Vahanwire is advised of the possibility of such damages. The foregoing limitation of liability shall apply to the fullest extent permitted by law in the applicable jurisdiction.",

        "In no event shall the total, aggregate liability of Vahanwire, or any of the above-referenced respective parties, arising from or relating to the website and/or application, and/or submitted content exceed the total amount of fees actually paid to Vahanwire by you hereunder.",

        "You hereby acknowledge and agree that Vahanwire shall not be liable for submitted content or the defamatory, offensive, or illegal conduct of any third party or user or service provider and that the risk of harm or damage from the foregoing rests entirely with you. You further acknowledge and agree that Vahanwire shall not be liable for any direct, indirect, incidental, special, punitive, consequential or exemplary damages (including but not limited to loss of business, revenue, profits, use, data or other economic advantage) whatsoever resulting from or relating to any contract between website users entered into independently of the website.",

        "The website may contain links to third-party website and/or application that are not owned or controlled by Vahanwire. Vahanwire does not have any control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party website and/or application. In addition, Vahanwire will not and cannot censor or edit the content of any third-party site. By using the website and/or application, you expressly relieve Vahanwire from any and all liability arising from your use of any thirdparty website. Accordingly, please be advised to read the terms and conditions and privacy policy of each third-party website and/or application that you visit, including those directed by the links contained on the website and/or application.",
      ],
    },
  ];

  return (
    <div className="bg-[rgba(244,244,244,1)]">
      <div>
        <Suspense fallback={<ComponentFallback />}>
          <PageBanner title="Terms & Conditions" image={termsConditionBanner} />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<ComponentFallback />}>
          <TwoColumnInfoLayout
            title="Terms & Conditions of Use"
            sections={sections}
          />
        </Suspense>
      </div>

      {/* <Suspense fallback={<ComponentFallback />}>
        <AddBanner />
      </Suspense> */}
    </div>
  );
};

export default TermsCondition;

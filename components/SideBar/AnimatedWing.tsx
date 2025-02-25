import { motion } from "framer-motion";

const AnimatedWing = () => {
  return (
    <motion.svg
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, -20, 0] }}
      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      className="w-12 h-12"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <g transform="scale(0.6) translate(-50, -50)"> */}
      {/* Replace this with your actual wing path */}
      <path
        d="M0 0 C5.23429979 -0.20139981 9.79734765 0.48088172 14.81518555 1.85400391 C15.57070363 2.0532355 16.32622171 2.2524671 17.10463428 2.45773602 C19.61756606 3.12255234 22.12703976 3.79957977 24.63671875 4.4765625 C26.43562163 4.95490755 28.23474019 5.43244211 30.03405762 5.90922546 C33.89532021 6.93405383 37.75512153 7.96415626 41.61386108 8.9984436 C47.75567193 10.6445458 53.90057769 12.27886549 60.04614258 13.91088867 C66.40235987 15.59925638 72.75846278 17.28803783 79.11357117 18.98057556 C98.06334218 24.02644416 117.0311092 29.00196785 136.00454712 33.95797729 C141.17772936 35.30952448 146.3500767 36.66424629 151.5222168 38.01977539 C153.23362731 38.46826684 154.94503783 38.91675826 156.65644836 39.36524963 C157.50038965 39.58641512 158.34433094 39.8075806 159.21384621 40.03544807 C171.16160802 43.16639153 183.11086113 46.29139241 195.06440067 49.40021229 C201.8181646 51.15700539 208.57036792 52.91971081 215.32147884 54.68667126 C220.01241788 55.91404588 224.70514322 57.13422312 229.3994627 58.34860039 C232.27401376 59.09421671 235.14660297 59.84717899 238.01869774 60.60219574 C239.94658862 61.10674929 241.87673066 61.60267745 243.80696106 62.09820557 C259.60113803 66.27140114 271.19833024 71.07999549 279.75 85.4375 C280.85938655 87.36213562 281.94943786 89.29547768 283.02490234 91.23925781 C283.89056897 92.80239945 284.78141467 94.35153773 285.67578125 95.8984375 C289 101.68538732 289 101.68538732 289 104 C273.20501338 102.04135433 257.41185058 100.06832793 241.61987305 98.08558655 C239.89274104 97.86874265 238.16560888 97.65190003 236.43847656 97.43505859 C235.10163441 97.26720746 235.10163441 97.26720746 233.73778534 97.09596539 C227.46430384 96.30855313 221.19053407 95.52346561 214.91665459 94.73923111 C202.60721688 93.20049767 190.29852962 91.65594097 177.99082756 90.10338211 C171.75311673 89.31669489 165.51510615 88.53258416 159.27630615 87.75457764 C153.30377499 87.00965458 147.33217734 86.2576354 141.36117935 85.50052452 C139.13812071 85.21987376 136.91474486 84.9417225 134.69103622 84.6662693 C85.62974724 78.58223844 44.53240266 47.1541557 9.8125 13.125 C9.01912231 12.35820923 9.01912231 12.35820923 8.2097168 11.57592773 C4.67317734 8.03249332 2.32819731 4.43413235 0 0 Z "
        fill="#2ECC40"
        transform="translate(3,0)"
      />

      <path
        d="M0 0 C11.70867528 0.60081605 23.25149763 1.93392149 34.87182617 3.45263672 C36.82493834 3.70444705 38.77810045 3.95587023 40.73130798 4.2069397 C45.99196825 4.88444988 51.25184765 5.56784362 56.51154876 6.25275564 C60.91741985 6.82598514 65.32365001 7.39642821 69.72987443 7.96693432 C80.12769023 9.31332004 90.52485525 10.6646502 100.92163086 12.01904297 C111.62090254 13.41274797 122.3212696 14.7977996 133.02220553 16.17866313 C142.24027222 17.36850204 151.4576132 18.56385096 160.67440206 19.76354802 C166.16604155 20.47830007 171.65792948 21.19097709 177.15053368 21.8982811 C182.31346805 22.56336458 187.47545806 23.23535685 192.63681984 23.91253281 C194.52300104 24.15885091 196.4094948 24.40279009 198.29632568 24.64408112 C228.17339087 28.46938254 228.17339087 28.46938254 234 36 C236.19783559 39.49357448 238.2489324 43.0262981 240.203125 46.66015625 C241.31436119 48.72560613 242.48194466 50.76307904 243.734375 52.74609375 C245 55 245 55 245 58 C227.68408295 58.65397244 210.36809417 59.30600764 193.05201817 59.95575714 C185.01128793 60.2575136 176.97058217 60.55989619 168.92993164 60.86376953 C161.91907244 61.12872325 154.90816957 61.39248513 147.89721245 61.65483522 C144.18738305 61.79369825 140.47757773 61.93314488 136.76782417 62.07402039 C132.61945383 62.23152966 128.47098812 62.38637715 124.32250977 62.54101562 C122.49154755 62.61114616 122.49154755 62.61114616 120.62359619 62.68269348 C102.53355163 63.35036877 88.27220252 60.92561506 72 53 C71.39607422 52.7102832 70.79214844 52.42056641 70.16992188 52.12207031 C53.69860775 44.12145944 38.34351834 33.32495702 24 22 C23.09507813 21.28714844 22.19015625 20.57429688 21.2578125 19.83984375 C16.1509405 15.73843239 11.21782717 11.4699356 6.375 7.0625 C5.85357422 6.5895752 5.33214844 6.11665039 4.79492188 5.62939453 C1.12324261 2.24648522 1.12324261 2.24648522 0 0 Z "
        fill="#2ECC40"
        transform="translate(66,84)"
      />

      <path
        d="M0 0 C1.08245892 -0.01623067 1.08245892 -0.01623067 2.1867857 -0.03278923 C6.51546444 0.24325893 9.30810329 2.19033312 12.24836731 5.21969604 C19.18586731 15.51405088 19.18586731 15.51405088 19.18586731 19.09469604 C-0.28509065 23.67407254 -19.80524978 28.02251821 -39.35830116 32.23646164 C-43.83452543 33.20134879 -48.30900701 34.17312507 -52.78019714 35.16110229 C-57.19652771 36.13679132 -61.61635683 37.09486858 -66.03906059 38.04123306 C-67.69261053 38.39800176 -69.3449151 38.76060533 -70.99574471 39.12975693 C-95.98094469 44.70355368 -116.34780124 40.56407964 -139.81413269 31.09469604 C-140.92957458 30.64634399 -140.92957458 30.64634399 -142.06755066 30.18893433 C-151.51292793 26.3327845 -160.48818545 21.78769998 -169.37663269 16.78219604 C-170.30008484 16.26632935 -171.22353699 15.75046265 -172.17497253 15.21896362 C-173.02655945 14.72807251 -173.87814636 14.2371814 -174.75553894 13.73141479 C-175.51552185 13.29530884 -176.27550476 12.85920288 -177.05851746 12.40988159 C-178.81413269 11.09469604 -178.81413269 11.09469604 -179.81413269 8.09469604 C-163.64144291 7.34643962 -147.46873093 6.59866477 -131.29599476 5.85141182 C-123.78095333 5.50417281 -116.2659185 5.15679225 -108.75090027 4.80905151 C-90.37737298 3.95892621 -72.00370994 3.11182454 -53.62981415 2.2696991 C-49.95456456 2.10113684 -46.27933596 1.93212313 -42.60411072 1.76303101 C-37.2462861 1.51676574 -31.88836746 1.27266704 -26.53035545 1.03051376 C-24.63366766 0.94451351 -22.73701028 0.85783902 -20.84038734 0.77042007 C-18.27792662 0.65245906 -15.71536343 0.53705024 -13.15275574 0.42233276 C-12.06927762 0.3716118 -12.06927762 0.3716118 -10.96391106 0.31986618 C-7.31019684 0.15920581 -3.65695967 0.0500759 0 0 Z "
        fill="#2ECC41"
        transform="translate(304.8141326904297,149.90530395507813)"
      />

      <path
        d="M0 0 C2.9965883 -0.29841543 5.17527901 -0.29896279 8.07421875 0.53125 C11.26947968 3.37077611 13.05741416 6.79900243 15.07421875 10.53125 C15.7923196 11.75918579 16.5151911 12.98434103 17.2421875 14.20703125 C22.12237852 22.48954109 25.1100972 28.66513942 24.07421875 38.53125 C22.9307695 42.7774295 21.03830788 46.61524778 19.07421875 50.53125 C18.64995605 51.38928223 18.22569336 52.24731445 17.78857422 53.13134766 C0.48072907 87.91758756 0.48072907 87.91758756 -14.92578125 97.53125 C-16.24578125 97.53125 -17.56578125 97.53125 -18.92578125 97.53125 C-18.88819702 96.72597366 -18.85061279 95.92069733 -18.81188965 95.09101868 C-18.45386164 87.4012307 -18.1005965 79.7112441 -17.75232697 72.02100849 C-17.57323588 68.06995569 -17.39247449 64.11899588 -17.20751953 60.16821289 C-16.99382823 55.59804711 -16.78579349 51.02765018 -16.58203125 46.45703125 C-16.54864655 45.71427067 -16.51526184 44.97151009 -16.48086548 44.20624161 C-16.04427364 34.34777327 -15.75631434 24.50860592 -16.02502441 14.63948059 C-16.10438338 10.48674303 -15.97826484 7.20411538 -13.92578125 3.53125 C-9.63174965 1.31228834 -4.71752505 0.85658666 0 0 Z "
        fill="#2ECB40"
        transform="translate(318.92578125,174.46875)"
      />

      <path
        d="M0 0 C-0.40936152 22.81260096 -8.258879 45.10416295 -23.859375 62.015625 C-30.58847974 68.41105512 -38.85130104 72.61239182 -48 74 C-45.88567762 64.41347012 -43.72510708 54.83822412 -41.52258301 45.27160645 C-41.1745442 43.75872297 -40.82745556 42.2456206 -40.48132324 40.7322998 C-39.46903132 36.3098808 -38.43705496 31.89290216 -37.37695312 27.48168945 C-37.04414599 26.08490307 -36.71757225 24.68661576 -36.39746094 23.28686523 C-35.94620468 21.32003799 -35.46966147 19.35906501 -34.9921875 17.3984375 C-34.72776855 16.28130371 -34.46334961 15.16416992 -34.19091797 14.01318359 C-32.37700734 9.42374428 -29.40664362 6.88701769 -25.29296875 4.29296875 C-21.01742711 2.61419736 -16.84523684 1.94715252 -12.3125 1.3125 C-11.45849609 1.18294922 -10.60449219 1.05339844 -9.72460938 0.91992188 C-6.43853374 0.43204419 -3.32742074 0 0 0 Z "
        fill="#2ECC40"
        transform="translate(297,181)"
      />

      <path
        d="M0 0 C-0.48727518 5.9263198 -1.67942328 10.46320417 -4.375 15.75 C-4.7258667 16.43956787 -5.0767334 17.12913574 -5.43823242 17.83959961 C-12.47336034 30.99487775 -23.56902195 41.03046895 -37.9296875 45.58984375 C-40.32481765 46.06435067 -42.56442851 46.07213365 -45 46 C-31.42355618 11.33764186 -31.42355618 11.33764186 -18.8515625 5.55078125 C-4.95075215 0 -4.95075215 0 0 0 Z "
        fill="#2ECC40"
        transform="translate(257,190)"
      />

      {/* <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.95 7.05C17.34 7.44 17.34 8.07 16.95 8.46L12.41 13H15C15.55 13 16 13.45 16 14C16 14.55 15.55 15 15 15H9C8.45 15 8 14.55 8 14V10C8 9.45 8.45 9 9 9C9.55 9 10 9.45 10 10V12.59L14.54 8.05C14.93 7.66 15.56 7.66 15.95 8.05L16.95 7.05Z"
          fill="black"
          stroke="black"
          //   fill="transparent"
          strokeWidth="2"
        /> */}
      {/* </g> */}
    </motion.svg>
  );
};

export default AnimatedWing;

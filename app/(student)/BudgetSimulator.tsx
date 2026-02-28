// import { Fredoka_700Bold } from '@expo-google-fonts/fredoka';
// import {
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
//   Poppins_700Bold,
// } from '@expo-google-fonts/poppins';
// import { useFonts } from 'expo-font';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {
//   Circle,
//   Defs,
//   Path,
//   Stop,
//   Svg,
//   LinearGradient as SvgLinearGradient,
//   Text as SvgText,
// } from 'react-native-svg';

// const { width, height } = Dimensions.get('window');

// // ═══════════════════════════════════════════════════════════════════
// // ─── TYPES ────────────────────────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// type SimStep = 'job-select' | 'payslip' | 'budget' | 'life-event' | 'results';

// interface Job {
//   id: string;
//   title: string;
//   emoji: string;
//   description: string;
//   color: string;
//   grossAnnual: number;
//   grossMonthly: number;
//   incomeTax: number;
//   nationalInsurance: number;
//   takeHome: number;
// }

// interface BudgetCategory {
//   id: string;
//   label: string;
//   emoji: string;
//   color: string;
//   suggestedPercent: number;
//   min: number;
//   max: number;
// }

// interface LifeEvent {
//   id: string;
//   title: string;
//   emoji: string;
//   description: string;
//   cost: number;
//   color: string;
//   tip: string;
// }

// // ═══════════════════════════════════════════════════════════════════
// // ─── MOCK DATA ────────────────────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// const JOBS: Job[] = [
//   {
//     id: 'apprentice',
//     title: 'Apprentice',
//     emoji: '🔧',
//     description: 'Learning a trade while earning. £15,000/year starting salary.',
//     color: '#4FC3F7',
//     grossAnnual: 15000,
//     grossMonthly: 1250,
//     incomeTax: 42, // simplified
//     nationalInsurance: 48,
//     takeHome: 1160,
//   },
//   {
//     id: 'retail',
//     title: 'Retail Assistant',
//     emoji: '🛍️',
//     description: 'Working in a shop, helping customers. £18,500/year full-time.',
//     color: '#FF2E91',
//     grossAnnual: 18500,
//     grossMonthly: 1542,
//     incomeTax: 100,
//     nationalInsurance: 66,
//     takeHome: 1376,
//   },
//   {
//     id: 'office',
//     title: 'Office Junior',
//     emoji: '💻',
//     description: 'Entry-level office work, admin and support. £22,000/year.',
//     color: '#A855F7',
//     grossAnnual: 22000,
//     grossMonthly: 1833,
//     incomeTax: 170,
//     nationalInsurance: 86,
//     takeHome: 1577,
//   },
// ];

// const BUDGET_CATEGORIES: BudgetCategory[] = [
//   {
//     id: 'rent',
//     label: 'Rent / Board',
//     emoji: '🏠',
//     color: '#4FC3F7',
//     suggestedPercent: 30,
//     min: 0,
//     max: 60,
//   },
//   {
//     id: 'travel',
//     label: 'Travel',
//     emoji: '🚌',
//     color: '#A855F7',
//     suggestedPercent: 10,
//     min: 0,
//     max: 30,
//   },
//   {
//     id: 'food',
//     label: 'Food & Groceries',
//     emoji: '🍕',
//     color: '#10B981',
//     suggestedPercent: 15,
//     min: 0,
//     max: 40,
//   },
//   {
//     id: 'phone',
//     label: 'Phone Bill',
//     emoji: '📱',
//     color: '#F59E0B',
//     suggestedPercent: 5,
//     min: 0,
//     max: 15,
//   },
//   {
//     id: 'subscriptions',
//     label: 'Subscriptions',
//     emoji: '📺',
//     color: '#FF2E91',
//     suggestedPercent: 5,
//     min: 0,
//     max: 20,
//   },
//   {
//     id: 'savings',
//     label: 'Savings',
//     emoji: '🐷',
//     color: '#FFD700',
//     suggestedPercent: 15,
//     min: 0,
//     max: 50,
//   },
//   {
//     id: 'fun',
//     label: 'Fun Spending',
//     emoji: '🎮',
//     color: '#3B82F6',
//     suggestedPercent: 20,
//     min: 0,
//     max: 50,
//   },
// ];

// const LIFE_EVENTS: LifeEvent[] = [
//   {
//     id: 'phone-repair',
//     title: 'Phone Screen Cracked!',
//     emoji: '📱💥',
//     description: 'You dropped your phone and the screen cracked. Repair cost: £85.',
//     cost: 85,
//     color: '#EF4444',
//     tip: 'Having some savings set aside makes surprise costs much less stressful.',
//   },
//   {
//     id: 'birthday',
//     title: "Best Friend's Birthday",
//     emoji: '🎂🎁',
//     description: "Your best mate's birthday is coming up. A nice gift costs around £25.",
//     cost: 25,
//     color: '#F59E0B',
//     tip: 'Planning ahead for birthdays can help — you could even set aside a little each month.',
//   },
//   {
//     id: 'travel-cost',
//     title: 'Bus Pass Price Increase',
//     emoji: '🚌💸',
//     description: 'Your monthly bus pass just went up by £15 per month.',
//     cost: 15,
//     color: '#A855F7',
//     tip: 'Price increases happen all the time. Having flexible budget areas helps you adapt.',
//   },
// ];

// // ═══════════════════════════════════════════════════════════════════
// // ─── SHARED VISUAL COMPONENTS ─────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════

// // ── Floating Coin ──
// const FloatingCoin = ({
//   delay,
//   startX,
//   startY,
//   size,
//   opacity,
// }: {
//   delay: number;
//   startX: number;
//   startY: number;
//   size: number;
//   opacity: number;
// }) => {
//   const floatAnim = useRef(new Animated.Value(0)).current;
//   const fadeIn = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeIn, {
//       toValue: 1,
//       duration: 800,
//       delay: delay + 400,
//       useNativeDriver: true,
//     }).start();
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(floatAnim, {
//           toValue: 1,
//           duration: 2400 + delay * 0.5,
//           useNativeDriver: true,
//         }),
//         Animated.timing(floatAnim, {
//           toValue: 0,
//           duration: 2400 + delay * 0.5,
//           useNativeDriver: true,
//         }),
//       ]),
//     ).start();
//   }, []);

//   const translateY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });

//   return (
//     <Animated.View
//       style={{
//         position: 'absolute',
//         left: startX,
//         top: startY,
//         opacity: Animated.multiply(fadeIn, opacity),
//         transform: [{ translateY }],
//         zIndex: 0,
//       }}
//     >
//       <Svg width={size} height={size} viewBox="0 0 40 40">
//         <Defs>
//           <SvgLinearGradient id={`simCoin-${delay}`} x1="0" y1="0" x2="0" y2="1">
//             <Stop offset="0" stopColor="#FFD700" />
//             <Stop offset="1" stopColor="#F5A623" />
//           </SvgLinearGradient>
//         </Defs>
//         <Circle cx="20" cy="20" r="18" fill={`url(#simCoin-${delay})`} />
//         <Circle cx="20" cy="20" r="14" fill="none" stroke="#E8960C" strokeWidth="1.5" />
//         <SvgText x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B8760A">
//           £
//         </SvgText>
//       </Svg>
//     </Animated.View>
//   );
// };

// // ── Bottom Wave ──
// const BottomWave = () => {
//   const waveOffset = useRef(new Animated.Value(0)).current;
//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(waveOffset, { toValue: 1, duration: 3000, useNativeDriver: true }),
//         Animated.timing(waveOffset, { toValue: 0, duration: 3000, useNativeDriver: true }),
//       ]),
//     ).start();
//   }, []);
//   const waveTranslateX = waveOffset.interpolate({ inputRange: [0, 1], outputRange: [0, -30] });
//   return (
//     <Animated.View
//       style={[styles.waveContainer, { transform: [{ translateX: waveTranslateX }] }]}
//       pointerEvents="none"
//     >
//       <Svg width={width + 60} height={140} viewBox={`0 0 ${width + 60} 140`}>
//         <Path
//           d={`M0 60 Q${width * 0.15} 30 ${width * 0.3} 55 Q${width * 0.45} 80 ${width * 0.6} 50 Q${width * 0.75} 20 ${width * 0.9} 55 Q${width * 1.05} 90 ${width + 60} 50 L${width + 60} 140 L0 140 Z`}
//           fill="#4FC3F7"
//           opacity={0.12}
//         />
//         <Path
//           d={`M0 80 Q${width * 0.2} 55 ${width * 0.35} 75 Q${width * 0.5} 95 ${width * 0.65} 70 Q${width * 0.8} 45 ${width * 0.95} 75 L${width + 60} 65 L${width + 60} 140 L0 140 Z`}
//           fill="#4FC3F7"
//           opacity={0.08}
//         />
//       </Svg>
//     </Animated.View>
//   );
// };

// // ── Step Indicator ──
// const STEP_LABELS = ['Job', 'Payslip', 'Budget', 'Event', 'Results'];
// const StepIndicator = ({ currentIndex }: { currentIndex: number }) => (
//   <View style={styles.stepRow}>
//     {STEP_LABELS.map((label, i) => {
//       const isActive = i === currentIndex;
//       const isDone = i < currentIndex;
//       return (
//         <View key={label} style={styles.stepItem}>
//           <View
//             style={[styles.stepDot, isDone && styles.stepDotDone, isActive && styles.stepDotActive]}
//           >
//             {isDone ? (
//               <Text style={styles.stepCheck}>✓</Text>
//             ) : (
//               <Text style={[styles.stepNumber, isActive && { color: '#1A1B4B' }]}>{i + 1}</Text>
//             )}
//           </View>
//           <Text
//             style={[styles.stepLabel, (isActive || isDone) && { color: 'rgba(255,255,255,0.7)' }]}
//           >
//             {label}
//           </Text>
//           {i < STEP_LABELS.length - 1 && (
//             <View style={[styles.stepLine, isDone && { backgroundColor: '#FFD700' }]} />
//           )}
//         </View>
//       );
//     })}
//   </View>
// );

// // ── Formatting ──
// const formatPound = (n: number) =>
//   `£${n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

// // ── Mini Progress Bar ──
// const MiniProgressBar = ({ progress, color }: { progress: number; color: string }) => (
//   <View style={styles.miniProgressTrack}>
//     <View
//       style={[
//         styles.miniProgressFill,
//         { width: `${Math.min(progress, 1) * 100}%`, backgroundColor: color },
//       ]}
//     />
//   </View>
// );

// // ── Animated section helper ──
// const useFadeSlide = (count: number, deps: any[] = []) => {
//   const fades = useRef(Array.from({ length: count }, () => new Animated.Value(0))).current;
//   const slides = useRef(Array.from({ length: count }, () => new Animated.Value(28))).current;

//   const play = useCallback(() => {
//     fades.forEach((f) => f.setValue(0));
//     slides.forEach((s) => s.setValue(28));
//     const anims = fades.map((fade, i) =>
//       Animated.parallel([
//         Animated.timing(fade, { toValue: 1, duration: 380, delay: i * 80, useNativeDriver: true }),
//         Animated.timing(slides[i], {
//           toValue: 0,
//           duration: 380,
//           delay: i * 80,
//           useNativeDriver: true,
//         }),
//       ]),
//     );
//     Animated.stagger(50, anims).start();
//   }, []);

//   const anim = (i: number) => ({ opacity: fades[i], transform: [{ translateY: slides[i] }] });
//   return { play, anim };
// };

// // ═══════════════════════════════════════════════════════════════════
// // ─── STEP 1: JOB SELECTOR ────────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// const JobSelectStep = ({ onSelect }: { onSelect: (job: Job) => void }) => {
//   const { play, anim } = useFadeSlide(5);
//   useEffect(() => {
//     play();
//   }, []);

//   return (
//     <>
//       <Animated.View style={anim(0)}>
//         <View style={styles.stepHeaderRow}>
//           <View style={styles.stepIconCircle}>
//             <Text style={{ fontSize: 30 }}>💼</Text>
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.stepTitle}>Choose Your Job</Text>
//             <Text style={styles.stepSubtitle}>Pick a role to see what you'd earn</Text>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.View style={anim(1)}>
//         <Text style={styles.stepDescription}>
//           Imagine you've just finished school and landed your first job. Each role has a different
//           salary — tap one to get started!
//         </Text>
//       </Animated.View>

//       {JOBS.map((job, i) => (
//         <Animated.View key={job.id} style={anim(i + 2)}>
//           <TouchableOpacity activeOpacity={0.85} onPress={() => onSelect(job)}>
//             <LinearGradient
//               colors={[`${job.color}18`, `${job.color}06`]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={[styles.jobCard, { borderColor: `${job.color}30` }]}
//             >
//               <View style={[styles.jobEmojiCircle, { backgroundColor: `${job.color}20` }]}>
//                 <Text style={{ fontSize: 32 }}>{job.emoji}</Text>
//               </View>
//               <View style={styles.jobCardText}>
//                 <Text style={styles.jobTitle}>{job.title}</Text>
//                 <Text style={styles.jobDescription}>{job.description}</Text>
//                 <View style={styles.jobSalaryRow}>
//                   <Text style={[styles.jobSalary, { color: job.color }]}>
//                     {formatPound(job.grossAnnual)}/year
//                   </Text>
//                 </View>
//               </View>
//               <View style={[styles.jobArrow, { backgroundColor: `${job.color}20` }]}>
//                 <Text style={{ fontSize: 16, color: job.color }}>→</Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>
//         </Animated.View>
//       ))}
//     </>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════
// // ─── STEP 2: PAYSLIP BREAKDOWN ───────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// const PayslipStep = ({ job, onContinue }: { job: Job; onContinue: () => void }) => {
//   const { play, anim } = useFadeSlide(6);
//   useEffect(() => {
//     play();
//   }, []);

//   const deductionsTotal = job.incomeTax + job.nationalInsurance;
//   const deductionPercent = Math.round((deductionsTotal / job.grossMonthly) * 100);

//   return (
//     <>
//       <Animated.View style={anim(0)}>
//         <View style={styles.stepHeaderRow}>
//           <View
//             style={[
//               styles.stepIconCircle,
//               { backgroundColor: `${job.color}18`, borderColor: `${job.color}20` },
//             ]}
//           >
//             <Text style={{ fontSize: 28 }}>📄</Text>
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.stepTitle}>Your Payslip</Text>
//             <Text style={styles.stepSubtitle}>{job.title} — Monthly breakdown</Text>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.View style={anim(1)}>
//         <Text style={styles.stepDescription}>
//           Before your money hits your bank, some is taken for tax and National Insurance. Here's
//           what happens to your pay each month.
//         </Text>
//       </Animated.View>

//       {/* Payslip card */}
//       <Animated.View style={anim(2)}>
//         <View style={styles.payslipCard}>
//           {/* Header */}
//           <LinearGradient
//             colors={[`${job.color}25`, `${job.color}10`]}
//             style={styles.payslipHeader}
//           >
//             <Text style={styles.payslipHeaderLabel}>MONTHLY PAYSLIP</Text>
//             <Text style={styles.payslipHeaderRole}>
//               {job.emoji} {job.title}
//             </Text>
//           </LinearGradient>

//           {/* Gross */}
//           <View style={styles.payslipRow}>
//             <View style={styles.payslipRowLeft}>
//               <Text style={styles.payslipLabel}>Gross Monthly Pay</Text>
//               <Text style={styles.payslipHint}>Before any deductions</Text>
//             </View>
//             <Text style={styles.payslipAmountGross}>{formatPound(job.grossMonthly)}</Text>
//           </View>

//           {/* Divider */}
//           <View style={styles.payslipDivider} />
//           <Text style={styles.payslipSectionLabel}>DEDUCTIONS</Text>

//           {/* Income Tax */}
//           <View style={styles.payslipRow}>
//             <View style={styles.payslipRowLeft}>
//               <Text style={styles.payslipLabel}>Income Tax</Text>
//               <Text style={styles.payslipHint}>Money paid to the government</Text>
//             </View>
//             <Text style={styles.payslipAmountDeduct}>−{formatPound(job.incomeTax)}</Text>
//           </View>

//           {/* NI */}
//           <View style={styles.payslipRow}>
//             <View style={styles.payslipRowLeft}>
//               <Text style={styles.payslipLabel}>National Insurance</Text>
//               <Text style={styles.payslipHint}>Pays for NHS, pensions & benefits</Text>
//             </View>
//             <Text style={styles.payslipAmountDeduct}>−{formatPound(job.nationalInsurance)}</Text>
//           </View>

//           {/* Divider */}
//           <View style={styles.payslipDivider} />

//           {/* Take-home */}
//           <View style={styles.payslipRow}>
//             <View style={styles.payslipRowLeft}>
//               <Text style={styles.payslipLabelBold}>Take-Home Pay</Text>
//               <Text style={styles.payslipHint}>What actually reaches your bank</Text>
//             </View>
//             <Text style={[styles.payslipAmountGross, { color: '#10B981' }]}>
//               {formatPound(job.takeHome)}
//             </Text>
//           </View>
//         </View>
//       </Animated.View>

//       {/* Visual bar */}
//       <Animated.View style={anim(3)}>
//         <View style={styles.payslipBarContainer}>
//           <View style={styles.payslipBarTrack}>
//             <View
//               style={[
//                 styles.payslipBarFill,
//                 { width: `${100 - deductionPercent}%`, backgroundColor: '#10B981' },
//               ]}
//             />
//             <View
//               style={[
//                 styles.payslipBarFill,
//                 { width: `${deductionPercent}%`, backgroundColor: '#EF4444', opacity: 0.7 },
//               ]}
//             />
//           </View>
//           <View style={styles.payslipBarLabels}>
//             <Text style={styles.payslipBarLabelText}>
//               <Text style={{ color: '#10B981' }}>●</Text> Take-home {100 - deductionPercent}%
//             </Text>
//             <Text style={styles.payslipBarLabelText}>
//               <Text style={{ color: '#EF4444' }}>●</Text> Deductions {deductionPercent}%
//             </Text>
//           </View>
//         </View>
//       </Animated.View>

//       {/* Did you know box */}
//       <Animated.View style={anim(4)}>
//         <View style={styles.infoBox}>
//           <Text style={styles.infoBoxTitle}>💡 Did you know?</Text>
//           <Text style={styles.infoBoxText}>
//             In the UK, you don't pay any income tax on the first £12,570 you earn each year. This is
//             called your "Personal Allowance".
//           </Text>
//         </View>
//       </Animated.View>

//       {/* Continue */}
//       <Animated.View style={anim(5)}>
//         <TouchableOpacity activeOpacity={0.85} onPress={onContinue} style={{ marginTop: 8 }}>
//           <LinearGradient
//             colors={['#FFD700', '#F5A623']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.ctaButton}
//           >
//             <Text style={styles.ctaText}>Now Let's Budget! →</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animated.View>
//     </>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════
// // ─── STEP 3: BUDGET BUILDER ──────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════

// // ── Custom Slider ──
// const BudgetSlider = ({
//   category,
//   value,
//   maxBudget,
//   onChange,
// }: {
//   category: BudgetCategory;
//   value: number;
//   maxBudget: number;
//   onChange: (id: string, val: number) => void;
// }) => {
//   const sliderWidth = width - 80;
//   const percent = maxBudget > 0 ? Math.round((value / maxBudget) * 100) : 0;

//   // Tap-based increment/decrement (simpler + more accessible than drag for RN)
//   const step = Math.max(5, Math.round(maxBudget * 0.02));
//   const increment = () => onChange(category.id, Math.min(value + step, maxBudget));
//   const decrement = () => onChange(category.id, Math.max(value - step, 0));

//   return (
//     <View style={styles.sliderContainer}>
//       <View style={styles.sliderHeader}>
//         <View style={styles.sliderLabelRow}>
//           <Text style={styles.sliderEmoji}>{category.emoji}</Text>
//           <Text style={styles.sliderLabel}>{category.label}</Text>
//         </View>
//         <Text style={[styles.sliderValue, { color: category.color }]}>{formatPound(value)}</Text>
//       </View>

//       <View style={styles.sliderTrackRow}>
//         <TouchableOpacity
//           onPress={decrement}
//           style={[styles.sliderBtn, { borderColor: `${category.color}40` }]}
//           activeOpacity={0.6}
//         >
//           <Text style={[styles.sliderBtnText, { color: category.color }]}>−</Text>
//         </TouchableOpacity>

//         <View style={styles.sliderTrack}>
//           <View
//             style={[styles.sliderFill, { width: `${percent}%`, backgroundColor: category.color }]}
//           />
//           {/* Suggested marker */}
//           <View style={[styles.sliderSuggested, { left: `${category.suggestedPercent}%` }]}>
//             <View
//               style={[styles.sliderSuggestedLine, { backgroundColor: `${category.color}60` }]}
//             />
//           </View>
//         </View>

//         <TouchableOpacity
//           onPress={increment}
//           style={[styles.sliderBtn, { borderColor: `${category.color}40` }]}
//           activeOpacity={0.6}
//         >
//           <Text style={[styles.sliderBtnText, { color: category.color }]}>+</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.sliderSuggestedText}>
//         Suggested: ~{category.suggestedPercent}% (
//         {formatPound(Math.round((maxBudget * category.suggestedPercent) / 100))})
//       </Text>
//     </View>
//   );
// };

// // ── Money Left Indicator ──
// const MoneyLeftIndicator = ({ takeHome, spent }: { takeHome: number; spent: number }) => {
//   const remaining = takeHome - spent;
//   const isOver = remaining < 0;
//   const percent = takeHome > 0 ? Math.min((spent / takeHome) * 100, 100) : 0;
//   const barColor = isOver ? '#EF4444' : remaining < takeHome * 0.05 ? '#F59E0B' : '#10B981';

//   return (
//     <View style={[styles.moneyLeftCard, isOver && { borderColor: 'rgba(239,68,68,0.3)' }]}>
//       <View style={styles.moneyLeftTop}>
//         <View>
//           <Text style={styles.moneyLeftLabel}>Money Left</Text>
//           <Text style={[styles.moneyLeftAmount, { color: barColor }]}>
//             {isOver ? '−' : ''}
//             {formatPound(Math.abs(remaining))}
//           </Text>
//         </View>
//         <View>
//           <Text style={styles.moneyLeftLabel}>Total Budget</Text>
//           <Text style={styles.moneyLeftSpent}>
//             {formatPound(spent)} / {formatPound(takeHome)}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.moneyLeftTrack}>
//         <View
//           style={[
//             styles.moneyLeftFill,
//             { width: `${Math.min(percent, 100)}%`, backgroundColor: barColor },
//           ]}
//         />
//       </View>
//       {isOver && (
//         <View style={styles.overspendWarning}>
//           <Text style={styles.overspendEmoji}>⚠️</Text>
//           <Text style={styles.overspendText}>
//             You're spending more than you earn! Try reducing some categories.
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const BudgetStep = ({
//   job,
//   budgetValues,
//   onBudgetChange,
//   onContinue,
// }: {
//   job: Job;
//   budgetValues: Record<string, number>;
//   onBudgetChange: (id: string, val: number) => void;
//   onContinue: () => void;
// }) => {
//   const { play, anim } = useFadeSlide(BUDGET_CATEGORIES.length + 4);
//   useEffect(() => {
//     play();
//   }, []);

//   const totalSpent = Object.values(budgetValues).reduce((s, v) => s + v, 0);
//   const remaining = job.takeHome - totalSpent;
//   const isValid = remaining >= 0;

//   return (
//     <>
//       <Animated.View style={anim(0)}>
//         <View style={styles.stepHeaderRow}>
//           <View
//             style={[
//               styles.stepIconCircle,
//               { backgroundColor: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.2)' },
//             ]}
//           >
//             <Text style={{ fontSize: 28 }}>💰</Text>
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.stepTitle}>Build Your Budget</Text>
//             <Text style={styles.stepSubtitle}>
//               Allocate your {formatPound(job.takeHome)} take-home pay
//             </Text>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.View style={anim(1)}>
//         <Text style={styles.stepDescription}>
//           Use the + and − buttons to decide how much to spend in each area. Try to keep within your
//           take-home pay!
//         </Text>
//       </Animated.View>

//       {/* Money Left — sticky-feeling top card */}
//       <Animated.View style={anim(2)}>
//         <MoneyLeftIndicator takeHome={job.takeHome} spent={totalSpent} />
//       </Animated.View>

//       {/* Category sliders */}
//       {BUDGET_CATEGORIES.map((cat, i) => (
//         <Animated.View key={cat.id} style={anim(i + 3)}>
//           <BudgetSlider
//             category={cat}
//             value={budgetValues[cat.id] ?? 0}
//             maxBudget={job.takeHome}
//             onChange={onBudgetChange}
//           />
//         </Animated.View>
//       ))}

//       {/* Continue */}
//       <Animated.View style={anim(BUDGET_CATEGORIES.length + 3)}>
//         <TouchableOpacity
//           activeOpacity={0.85}
//           onPress={onContinue}
//           disabled={!isValid}
//           style={{ marginTop: 12 }}
//         >
//           <LinearGradient
//             colors={
//               isValid ? ['#FFD700', '#F5A623'] : ['rgba(255,215,0,0.25)', 'rgba(245,166,35,0.15)']
//             }
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={[styles.ctaButton, !isValid && { opacity: 0.5 }]}
//           >
//             <Text style={[styles.ctaText, !isValid && { color: 'rgba(255,255,255,0.5)' }]}>
//               {isValid ? 'Lock In Budget →' : 'Over budget! Adjust first'}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animated.View>
//     </>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════
// // ─── STEP 4: LIFE EVENT ──────────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// const LifeEventStep = ({
//   event,
//   job,
//   budgetValues,
//   onContinue,
// }: {
//   event: LifeEvent;
//   job: Job;
//   budgetValues: Record<string, number>;
//   onContinue: () => void;
// }) => {
//   const { play, anim } = useFadeSlide(5);
//   useEffect(() => {
//     play();
//   }, []);

//   const savings = budgetValues['savings'] ?? 0;
//   const canAfford = savings >= event.cost;
//   const shakeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Shake the event card on mount
//     Animated.sequence([
//       Animated.timing(shakeAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
//       Animated.timing(shakeAnim, { toValue: -1, duration: 80, useNativeDriver: true }),
//       Animated.timing(shakeAnim, { toValue: 1, duration: 60, useNativeDriver: true }),
//       Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const shakeTranslate = shakeAnim.interpolate({ inputRange: [-1, 0, 1], outputRange: [-8, 0, 8] });

//   return (
//     <>
//       <Animated.View style={anim(0)}>
//         <View style={styles.stepHeaderRow}>
//           <View
//             style={[
//               styles.stepIconCircle,
//               { backgroundColor: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.2)' },
//             ]}
//           >
//             <Text style={{ fontSize: 28 }}>🎲</Text>
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.stepTitle}>Life Happens!</Text>
//             <Text style={styles.stepSubtitle}>An unexpected event just hit your budget</Text>
//           </View>
//         </View>
//       </Animated.View>

//       {/* Event card with shake */}
//       <Animated.View style={[anim(1), { transform: [{ translateX: shakeTranslate }] }]}>
//         <LinearGradient
//           colors={[`${event.color}20`, `${event.color}08`]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={[styles.lifeEventCard, { borderColor: `${event.color}30` }]}
//         >
//           <Text style={styles.lifeEventEmoji}>{event.emoji}</Text>
//           <Text style={styles.lifeEventTitle}>{event.title}</Text>
//           <Text style={styles.lifeEventDesc}>{event.description}</Text>
//           <View style={[styles.lifeEventCostPill, { backgroundColor: `${event.color}20` }]}>
//             <Text style={[styles.lifeEventCostText, { color: event.color }]}>
//               Cost: {formatPound(event.cost)}
//             </Text>
//           </View>
//         </LinearGradient>
//       </Animated.View>

//       {/* Impact assessment */}
//       <Animated.View style={anim(2)}>
//         <View style={styles.impactCard}>
//           <Text style={styles.impactTitle}>📊 Impact on Your Budget</Text>

//           <View style={styles.impactRow}>
//             <Text style={styles.impactLabel}>Your savings this month</Text>
//             <Text style={styles.impactValue}>{formatPound(savings)}</Text>
//           </View>
//           <View style={styles.impactRow}>
//             <Text style={styles.impactLabel}>Cost of this event</Text>
//             <Text style={[styles.impactValue, { color: '#EF4444' }]}>
//               −{formatPound(event.cost)}
//             </Text>
//           </View>
//           <View style={styles.payslipDivider} />
//           <View style={styles.impactRow}>
//             <Text style={styles.impactLabelBold}>Savings after</Text>
//             <Text style={[styles.impactValueBold, { color: canAfford ? '#10B981' : '#EF4444' }]}>
//               {formatPound(Math.max(savings - event.cost, 0))}
//             </Text>
//           </View>

//           {canAfford ? (
//             <View
//               style={[
//                 styles.impactBanner,
//                 { backgroundColor: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)' },
//               ]}
//             >
//               <Text style={styles.impactBannerEmoji}>🎉</Text>
//               <Text style={[styles.impactBannerText, { color: '#10B981' }]}>
//                 Your savings covered it! Smart planning pays off.
//               </Text>
//             </View>
//           ) : (
//             <View
//               style={[
//                 styles.impactBanner,
//                 { backgroundColor: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)' },
//               ]}
//             >
//               <Text style={styles.impactBannerEmoji}>😬</Text>
//               <Text style={[styles.impactBannerText, { color: '#EF4444' }]}>
//                 Your savings didn't cover the full cost. You'd need to borrow or cut spending
//                 elsewhere.
//               </Text>
//             </View>
//           )}
//         </View>
//       </Animated.View>

//       {/* Tip */}
//       <Animated.View style={anim(3)}>
//         <View style={styles.infoBox}>
//           <Text style={styles.infoBoxTitle}>🧠 Pro Tip</Text>
//           <Text style={styles.infoBoxText}>{event.tip}</Text>
//         </View>
//       </Animated.View>

//       {/* Continue */}
//       <Animated.View style={anim(4)}>
//         <TouchableOpacity activeOpacity={0.85} onPress={onContinue} style={{ marginTop: 8 }}>
//           <LinearGradient
//             colors={['#FFD700', '#F5A623']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.ctaButton}
//           >
//             <Text style={styles.ctaText}>See Your Results →</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animated.View>
//     </>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════
// // ─── STEP 5: RESULTS ─────────────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// const ResultsStep = ({
//   job,
//   budgetValues,
//   event,
//   onRestart,
//   onDashboard,
// }: {
//   job: Job;
//   budgetValues: Record<string, number>;
//   event: LifeEvent;
//   onRestart: () => void;
//   onDashboard: () => void;
// }) => {
//   const { play, anim } = useFadeSlide(7);
//   useEffect(() => {
//     play();
//   }, []);

//   const totalSpent = Object.values(budgetValues).reduce((s, v) => s + v, 0);
//   const savings = budgetValues['savings'] ?? 0;
//   const remaining = job.takeHome - totalSpent;
//   const savingsAfterEvent = Math.max(savings - event.cost, 0);
//   const couldAffordEvent = savings >= event.cost;

//   // Score: 0–5 stars
//   const savingsPercent = (savings / job.takeHome) * 100;
//   let stars = 1;
//   if (remaining >= 0 && savingsPercent >= 5) stars = 2;
//   if (remaining >= 0 && savingsPercent >= 10) stars = 3;
//   if (remaining >= 0 && savingsPercent >= 15 && couldAffordEvent) stars = 4;
//   if (remaining >= 0 && savingsPercent >= 20 && couldAffordEvent) stars = 5;

//   // Feedback tips
//   const tips: string[] = [];
//   if (savingsPercent < 10)
//     tips.push(
//       'Try setting aside at least 10% of your income as savings — even small amounts add up.',
//     );
//   if ((budgetValues['subscriptions'] ?? 0) > job.takeHome * 0.1)
//     tips.push('Your subscriptions are quite high. Could you share a family plan or drop one?');
//   if ((budgetValues['fun'] ?? 0) > job.takeHome * 0.25)
//     tips.push('Fun spending is important, but keeping it under 25% gives you more breathing room.');
//   if (couldAffordEvent)
//     tips.push('Great work — you had enough savings to handle an unexpected cost!');
//   if (tips.length === 0) tips.push("Solid budgeting! Keep practising and you'll be a money pro.");

//   // Badge
//   const badge =
//     stars >= 4
//       ? { emoji: '🏆', label: 'Budget Master', color: '#FFD700' }
//       : stars >= 2
//         ? { emoji: '📊', label: 'Smart Planner', color: '#4FC3F7' }
//         : { emoji: '🌱', label: 'Getting Started', color: '#10B981' };

//   // Confetti
//   const confettiAnims = useRef(Array.from({ length: 10 }, () => new Animated.Value(0))).current;
//   useEffect(() => {
//     if (stars >= 4) {
//       confettiAnims.forEach((ca, i) => {
//         Animated.sequence([
//           Animated.delay(400 + i * 50),
//           Animated.timing(ca, { toValue: 1, duration: 900, useNativeDriver: true }),
//         ]).start();
//       });
//     }
//   }, []);

//   return (
//     <>
//       {/* Confetti */}
//       {stars >= 4 &&
//         confettiAnims.map((ca, i) => {
//           const angle = (i / 10) * Math.PI * 2;
//           const dist = 70 + (i % 3) * 25;
//           const translateX = ca.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, Math.cos(angle) * dist],
//           });
//           const translateY = ca.interpolate({
//             inputRange: [0, 1],
//             outputRange: [0, Math.sin(angle) * dist - 30],
//           });
//           const opacity = ca.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] });
//           const colors = [
//             '#FFD700',
//             '#FF2E91',
//             '#4FC3F7',
//             '#10B981',
//             '#A855F7',
//             '#F59E0B',
//             '#FF6B6B',
//             '#70E0A0',
//             '#FFD700',
//             '#FF2E91',
//           ];
//           return (
//             <Animated.View
//               key={`rc-${i}`}
//               pointerEvents="none"
//               style={{
//                 position: 'absolute',
//                 left: width / 2 - 4,
//                 top: 180,
//                 width: 8,
//                 height: 8,
//                 borderRadius: i % 2 === 0 ? 4 : 1,
//                 backgroundColor: colors[i],
//                 opacity,
//                 transform: [{ translateX }, { translateY }],
//                 zIndex: 20,
//               }}
//             />
//           );
//         })}

//       <Animated.View style={anim(0)}>
//         <View style={styles.resultsTopSection}>
//           {/* Badge */}
//           <View
//             style={[
//               styles.resultsBadgeCircle,
//               { backgroundColor: `${badge.color}20`, borderColor: `${badge.color}40` },
//             ]}
//           >
//             <Text style={{ fontSize: 44 }}>{badge.emoji}</Text>
//           </View>
//           <Text style={styles.resultsBadgeLabel}>{badge.label}</Text>

//           {/* Stars */}
//           <View style={styles.starsRow}>
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Text key={i} style={[styles.starIcon, i < stars && { opacity: 1 }]}>
//                 ⭐
//               </Text>
//             ))}
//           </View>

//           <Text style={styles.resultsHeadline}>
//             {stars >= 4
//               ? 'Amazing budgeting! 🎉'
//               : stars >= 2
//                 ? 'Nice work! 👏'
//                 : 'Good effort! 💪'}
//           </Text>
//           <Text style={styles.resultsSubheadline}>
//             Here's how you managed your money as a {job.title}
//           </Text>
//         </View>
//       </Animated.View>

//       {/* Breakdown summary */}
//       <Animated.View style={anim(1)}>
//         <View style={styles.resultsSummaryCard}>
//           <Text style={styles.resultsSummaryTitle}>📋 Budget Summary</Text>
//           {BUDGET_CATEGORIES.map((cat) => {
//             const val = budgetValues[cat.id] ?? 0;
//             const pct = job.takeHome > 0 ? Math.round((val / job.takeHome) * 100) : 0;
//             return (
//               <View key={cat.id} style={styles.resultsSummaryRow}>
//                 <View style={styles.resultsSummaryLeft}>
//                   <Text style={styles.resultsSummaryEmoji}>{cat.emoji}</Text>
//                   <Text style={styles.resultsSummaryLabel}>{cat.label}</Text>
//                 </View>
//                 <View style={styles.resultsSummaryRight}>
//                   <Text style={[styles.resultsSummaryAmount, { color: cat.color }]}>
//                     {formatPound(val)}
//                   </Text>
//                   <Text style={styles.resultsSummaryPct}>{pct}%</Text>
//                 </View>
//               </View>
//             );
//           })}
//           <View style={styles.payslipDivider} />
//           <View style={styles.resultsSummaryRow}>
//             <Text style={styles.resultsSummaryLabelBold}>Remaining</Text>
//             <Text
//               style={[
//                 styles.resultsSummaryAmountBold,
//                 { color: remaining >= 0 ? '#10B981' : '#EF4444' },
//               ]}
//             >
//               {formatPound(remaining)}
//             </Text>
//           </View>
//         </View>
//       </Animated.View>

//       {/* Life event recap */}
//       <Animated.View style={anim(2)}>
//         <View style={styles.resultsSummaryCard}>
//           <Text style={styles.resultsSummaryTitle}>{event.emoji} Life Event Recap</Text>
//           <View style={styles.resultsSummaryRow}>
//             <Text style={styles.resultsSummaryLabel}>{event.title}</Text>
//             <Text style={[styles.resultsSummaryAmount, { color: '#EF4444' }]}>
//               −{formatPound(event.cost)}
//             </Text>
//           </View>
//           <View style={styles.resultsSummaryRow}>
//             <Text style={styles.resultsSummaryLabel}>Savings before</Text>
//             <Text style={styles.resultsSummaryAmount}>{formatPound(savings)}</Text>
//           </View>
//           <View style={styles.resultsSummaryRow}>
//             <Text style={styles.resultsSummaryLabelBold}>Savings after</Text>
//             <Text
//               style={[
//                 styles.resultsSummaryAmountBold,
//                 { color: couldAffordEvent ? '#10B981' : '#EF4444' },
//               ]}
//             >
//               {formatPound(savingsAfterEvent)}
//             </Text>
//           </View>
//         </View>
//       </Animated.View>

//       {/* Tips */}
//       <Animated.View style={anim(3)}>
//         <View style={styles.resultsTipsCard}>
//           <Text style={styles.resultsTipsTitle}>💡 Tips for Next Time</Text>
//           {tips.map((tip, i) => (
//             <View key={i} style={styles.resultsTipRow}>
//               <Text style={styles.resultsTipBullet}>•</Text>
//               <Text style={styles.resultsTipText}>{tip}</Text>
//             </View>
//           ))}
//         </View>
//       </Animated.View>

//       {/* Actions */}
//       <Animated.View style={anim(4)}>
//         <TouchableOpacity activeOpacity={0.85} onPress={onRestart} style={{ marginTop: 8 }}>
//           <LinearGradient
//             colors={['#FFD700', '#F5A623']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.ctaButton}
//           >
//             <Text style={styles.ctaText}>Try a Different Job 🔄</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View style={anim(5)}>
//         <TouchableOpacity activeOpacity={0.85} onPress={onDashboard} style={{ marginTop: 10 }}>
//           <View style={styles.secondaryButton}>
//             <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//     </>
//   );
// };

// // ═══════════════════════════════════════════════════════════════════
// // ─── MAIN SIMULATOR SCREEN ───────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// export default function BudgetSimulatorScreen() {
//   const router = useRouter();
//   const [fontsLoaded] = useFonts({
//     Poppins_700Bold,
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//     Fredoka_700Bold,
//   });

//   const scrollRef = useRef<ScrollView>(null);

//   // ── Simulator state ──
//   const [step, setStep] = useState<SimStep>('job-select');
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [budgetValues, setBudgetValues] = useState<Record<string, number>>({});
//   const [lifeEvent, setLifeEvent] = useState<LifeEvent>(LIFE_EVENTS[0]);

//   const stepIndex = ['job-select', 'payslip', 'budget', 'life-event', 'results'].indexOf(step);

//   const goToStep = (s: SimStep) => {
//     setStep(s);
//     scrollRef.current?.scrollTo({ y: 0, animated: true });
//   };

//   // ── Handlers ──
//   const handleJobSelect = (job: Job) => {
//     setSelectedJob(job);
//     // Pre-fill budget with suggested %
//     const initial: Record<string, number> = {};
//     BUDGET_CATEGORIES.forEach((cat) => {
//       initial[cat.id] = Math.round((job.takeHome * cat.suggestedPercent) / 100);
//     });
//     setBudgetValues(initial);
//     goToStep('payslip');
//   };

//   const handleBudgetChange = useCallback((id: string, val: number) => {
//     setBudgetValues((prev) => ({ ...prev, [id]: val }));
//   }, []);

//   const handleBudgetContinue = () => {
//     // Pick random life event
//     const randomEvent = LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)];
//     setLifeEvent(randomEvent);
//     goToStep('life-event');
//   };

//   const handleRestart = () => {
//     setSelectedJob(null);
//     setBudgetValues({});
//     goToStep('job-select');
//   };

//   if (!fontsLoaded) return null;

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

//       {/* Full-screen gradient */}
//       <LinearGradient
//         colors={['#1A1B4B', '#2D3A8C', '#4158D0']}
//         start={{ x: 0.2, y: 0 }}
//         end={{ x: 0.8, y: 1 }}
//         style={StyleSheet.absoluteFillObject}
//       />

//       {/* Sparkle dots */}
//       {[...Array(10)].map((_, i) => (
//         <View
//           key={`s-${i}`}
//           style={[
//             styles.star,
//             {
//               left: (i * 79 + 41) % width,
//               top: (i * 53 + 29) % (height * 0.3),
//               width: i % 3 === 0 ? 4 : 2,
//               height: i % 3 === 0 ? 4 : 2,
//               opacity: 0.1 + (i % 4) * 0.05,
//             },
//           ]}
//         />
//       ))}

//       {/* Floating coins */}
//       <FloatingCoin
//         delay={0}
//         startX={width * 0.07}
//         startY={height * 0.04}
//         size={18}
//         opacity={0.22}
//       />
//       <FloatingCoin
//         delay={400}
//         startX={width * 0.86}
//         startY={height * 0.07}
//         size={14}
//         opacity={0.18}
//       />

//       {/* Wave */}
//       <BottomWave />

//       <ScrollView
//         ref={scrollRef}
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Top bar */}
//         <View style={styles.topBar}>
//           <TouchableOpacity
//             onPress={() => {
//               if (step === 'job-select') {
//                 router.back();
//               } else {
//                 // Go back one step
//                 const steps: SimStep[] = [
//                   'job-select',
//                   'payslip',
//                   'budget',
//                   'life-event',
//                   'results',
//                 ];
//                 const prev = steps[Math.max(stepIndex - 1, 0)];
//                 goToStep(prev);
//               }
//             }}
//             style={styles.backButton}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.backArrow}>←</Text>
//           </TouchableOpacity>
//           <View style={styles.topBarCenter}>
//             <Text style={styles.topBarTitle}>Budget Simulator</Text>
//           </View>
//           <View style={{ width: 40 }} />
//         </View>

//         {/* Step indicator */}
//         <StepIndicator currentIndex={stepIndex} />

//         {/* Step content */}
//         {step === 'job-select' && <JobSelectStep onSelect={handleJobSelect} />}

//         {step === 'payslip' && selectedJob && (
//           <PayslipStep job={selectedJob} onContinue={() => goToStep('budget')} />
//         )}

//         {step === 'budget' && selectedJob && (
//           <BudgetStep
//             job={selectedJob}
//             budgetValues={budgetValues}
//             onBudgetChange={handleBudgetChange}
//             onContinue={handleBudgetContinue}
//           />
//         )}

//         {step === 'life-event' && selectedJob && (
//           <LifeEventStep
//             event={lifeEvent}
//             job={selectedJob}
//             budgetValues={budgetValues}
//             onContinue={() => goToStep('results')}
//           />
//         )}

//         {step === 'results' && selectedJob && (
//           <ResultsStep
//             job={selectedJob}
//             budgetValues={budgetValues}
//             event={lifeEvent}
//             onRestart={handleRestart}
//             onDashboard={() => router.back()}
//           />
//         )}

//         <View style={{ height: 120 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════
// // ─── STYLES ───────────────────────────────────────────────────────
// // ═══════════════════════════════════════════════════════════════════
// const styles = StyleSheet.create({
//   container: { flex: 1, overflow: 'hidden' },
//   star: { position: 'absolute', borderRadius: 4, backgroundColor: '#FFFFFF', zIndex: 0 },
//   waveContainer: { position: 'absolute', bottom: 0, left: -30, right: -30, height: 140, zIndex: 0 },
//   scrollView: { flex: 1, zIndex: 1 },
//   scrollContent: {
//     paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 12 : 56,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },

//   // ── Top Bar ──
//   topBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 14,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.06)',
//   },
//   backArrow: { fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#FFFFFF', marginTop: -2 },
//   topBarCenter: { flex: 1, alignItems: 'center' },
//   topBarTitle: {
//     fontFamily: 'Fredoka_700Bold',
//     fontSize: 20,
//     color: '#FFFFFF',
//     textShadowColor: 'rgba(0,0,0,0.2)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//   },

//   // ── Step Indicator ──
//   stepRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 24,
//     gap: 0,
//   },
//   stepItem: { flexDirection: 'row', alignItems: 'center' },
//   stepDot: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     borderWidth: 1.5,
//     borderColor: 'rgba(255,255,255,0.12)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   stepDotActive: { backgroundColor: '#FFD700', borderColor: '#FFD700' },
//   stepDotDone: { backgroundColor: 'rgba(255,215,0,0.2)', borderColor: '#FFD700' },
//   stepCheck: { fontFamily: 'Poppins_700Bold', fontSize: 12, color: '#FFD700' },
//   stepNumber: { fontFamily: 'Poppins_600SemiBold', fontSize: 11, color: 'rgba(255,255,255,0.4)' },
//   stepLabel: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 9,
//     color: 'rgba(255,255,255,0.3)',
//     position: 'absolute',
//     top: 32,
//     width: 50,
//     textAlign: 'center',
//     left: -11,
//   },
//   stepLine: { width: 20, height: 2, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 4 },

//   // ── Step Header ──
//   stepHeaderRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 14,
//     marginBottom: 10,
//     marginTop: 8,
//   },
//   stepIconCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255,215,0,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,215,0,0.15)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   stepTitle: {
//     fontFamily: 'Fredoka_700Bold',
//     fontSize: 24,
//     color: '#FFFFFF',
//     textShadowColor: 'rgba(0,0,0,0.15)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   stepSubtitle: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 13,
//     color: 'rgba(255,255,255,0.45)',
//     marginTop: 2,
//   },
//   stepDescription: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.6)',
//     lineHeight: 22,
//     marginBottom: 18,
//   },

//   // ── Job Card ──
//   jobCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 18,
//     borderWidth: 1,
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     gap: 14,
//     marginBottom: 12,
//   },
//   jobEmojiCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   jobCardText: { flex: 1 },
//   jobTitle: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#FFFFFF' },
//   jobDescription: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.5)',
//     marginTop: 3,
//     lineHeight: 18,
//   },
//   jobSalaryRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 6 },
//   jobSalary: { fontFamily: 'Poppins_700Bold', fontSize: 14 },
//   jobArrow: {
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   // ── Payslip ──
//   payslipCard: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     overflow: 'hidden',
//     marginBottom: 16,
//   },
//   payslipHeader: { paddingVertical: 14, paddingHorizontal: 18 },
//   payslipHeaderLabel: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 10,
//     color: 'rgba(255,255,255,0.4)',
//     letterSpacing: 1,
//   },
//   payslipHeaderRole: {
//     fontFamily: 'Poppins_700Bold',
//     fontSize: 16,
//     color: '#FFFFFF',
//     marginTop: 2,
//   },
//   payslipRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//   },
//   payslipRowLeft: { flex: 1 },
//   payslipLabel: { fontFamily: 'Poppins_500Medium', fontSize: 14, color: 'rgba(255,255,255,0.7)' },
//   payslipLabelBold: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#FFFFFF' },
//   payslipHint: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.35)',
//     marginTop: 2,
//   },
//   payslipAmountGross: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#FFFFFF' },
//   payslipAmountDeduct: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#EF4444' },
//   payslipDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginHorizontal: 18 },
//   payslipSectionLabel: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 10,
//     color: 'rgba(255,255,255,0.35)',
//     letterSpacing: 1,
//     paddingHorizontal: 18,
//     paddingTop: 10,
//   },

//   // ── Payslip Bar ──
//   payslipBarContainer: { marginBottom: 16 },
//   payslipBarTrack: {
//     flexDirection: 'row',
//     height: 10,
//     borderRadius: 5,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(255,255,255,0.06)',
//   },
//   payslipBarFill: { height: '100%' },
//   payslipBarLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
//   payslipBarLabelText: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.45)',
//   },

//   // ── Info Box ──
//   infoBox: {
//     backgroundColor: 'rgba(79,195,247,0.08)',
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(79,195,247,0.12)',
//   },
//   infoBoxTitle: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 14,
//     color: '#4FC3F7',
//     marginBottom: 6,
//   },
//   infoBoxText: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 13,
//     color: 'rgba(255,255,255,0.6)',
//     lineHeight: 20,
//   },

//   // ── CTA Button ──
//   ctaButton: {
//     borderRadius: 20,
//     paddingVertical: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#F5A623',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 12,
//       },
//       android: { elevation: 6 },
//     }),
//   },
//   ctaText: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#1A1B4B', letterSpacing: 0.3 },

//   // ── Secondary Button ──
//   secondaryButton: {
//     borderRadius: 20,
//     paddingVertical: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//   },
//   secondaryButtonText: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 15,
//     color: 'rgba(255,255,255,0.7)',
//   },

//   // ── Budget Slider ──
//   sliderContainer: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.06)',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     marginBottom: 10,
//   },
//   sliderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   sliderLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   sliderEmoji: { fontSize: 20 },
//   sliderLabel: { fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: 'rgba(255,255,255,0.8)' },
//   sliderValue: { fontFamily: 'Poppins_700Bold', fontSize: 16 },
//   sliderTrackRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   sliderBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     borderWidth: 1.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//   },
//   sliderBtnText: { fontFamily: 'Poppins_700Bold', fontSize: 20, marginTop: -2 },
//   sliderTrack: {
//     flex: 1,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   sliderFill: { height: '100%', borderRadius: 4 },
//   sliderSuggested: { position: 'absolute', top: -4, bottom: -4 },
//   sliderSuggestedLine: { width: 2, height: 16, borderRadius: 1 },
//   sliderSuggestedText: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 10,
//     color: 'rgba(255,255,255,0.3)',
//     marginTop: 6,
//   },

//   // ── Money Left ──
//   moneyLeftCard: {
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//     marginBottom: 18,
//   },
//   moneyLeftTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 12,
//   },
//   moneyLeftLabel: {
//     fontFamily: 'Poppins_500Medium',
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.45)',
//     marginBottom: 2,
//   },
//   moneyLeftAmount: { fontFamily: 'Fredoka_700Bold', fontSize: 28 },
//   moneyLeftSpent: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.6)',
//     textAlign: 'right',
//   },
//   moneyLeftTrack: {
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     overflow: 'hidden',
//   },
//   moneyLeftFill: { height: '100%', borderRadius: 4 },
//   overspendWarning: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 12,
//     backgroundColor: 'rgba(239,68,68,0.1)',
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(239,68,68,0.15)',
//   },
//   overspendEmoji: { fontSize: 18 },
//   overspendText: { fontFamily: 'Poppins_500Medium', fontSize: 12, color: '#EF4444', flex: 1 },

//   // ── Life Event ──
//   lifeEventCard: {
//     borderRadius: 20,
//     borderWidth: 1,
//     padding: 24,
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 4,
//   },
//   lifeEventEmoji: { fontSize: 48, marginBottom: 12 },
//   lifeEventTitle: {
//     fontFamily: 'Fredoka_700Bold',
//     fontSize: 22,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   lifeEventDesc: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.6)',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 14,
//   },
//   lifeEventCostPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
//   lifeEventCostText: { fontFamily: 'Poppins_700Bold', fontSize: 16 },

//   // ── Impact ──
//   impactCard: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },
//   impactTitle: { fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#FFFFFF', marginBottom: 14 },
//   impactRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 6,
//   },
//   impactLabel: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.6)' },
//   impactLabelBold: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#FFFFFF' },
//   impactValue: { fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#FFFFFF' },
//   impactValueBold: { fontFamily: 'Poppins_700Bold', fontSize: 18 },
//   impactBanner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginTop: 14,
//     borderRadius: 14,
//     paddingVertical: 14,
//     paddingHorizontal: 14,
//     borderWidth: 1,
//   },
//   impactBannerEmoji: { fontSize: 24 },
//   impactBannerText: { fontFamily: 'Poppins_500Medium', fontSize: 13, flex: 1, lineHeight: 20 },

//   // ── Mini Progress Bar ──
//   miniProgressTrack: {
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     overflow: 'hidden',
//     width: '100%',
//   },
//   miniProgressFill: { height: '100%', borderRadius: 3 },

//   // ── Results ──
//   resultsTopSection: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
//   resultsBadgeCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     marginBottom: 12,
//   },
//   resultsBadgeLabel: {
//     fontFamily: 'Poppins_600SemiBold',
//     fontSize: 14,
//     color: '#FFD700',
//     marginBottom: 8,
//   },
//   starsRow: { flexDirection: 'row', gap: 4, marginBottom: 12 },
//   starIcon: { fontSize: 22, opacity: 0.2 },
//   resultsHeadline: {
//     fontFamily: 'Fredoka_700Bold',
//     fontSize: 26,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0,0,0,0.15)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   resultsSubheadline: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 13,
//     color: 'rgba(255,255,255,0.5)',
//     textAlign: 'center',
//     marginTop: 6,
//   },

//   resultsSummaryCard: {
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 14,
//   },
//   resultsSummaryTitle: {
//     fontFamily: 'Poppins_700Bold',
//     fontSize: 15,
//     color: '#FFFFFF',
//     marginBottom: 14,
//   },
//   resultsSummaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 6,
//   },
//   resultsSummaryLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
//   resultsSummaryEmoji: { fontSize: 18 },
//   resultsSummaryLabel: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 13,
//     color: 'rgba(255,255,255,0.6)',
//   },
//   resultsSummaryLabelBold: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#FFFFFF' },
//   resultsSummaryRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   resultsSummaryAmount: { fontFamily: 'Poppins_600SemiBold', fontSize: 14 },
//   resultsSummaryAmountBold: { fontFamily: 'Poppins_700Bold', fontSize: 18 },
//   resultsSummaryPct: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.35)',
//     width: 30,
//     textAlign: 'right',
//   },

//   resultsTipsCard: {
//     backgroundColor: 'rgba(168,85,247,0.08)',
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(168,85,247,0.12)',
//     padding: 18,
//     marginBottom: 8,
//   },
//   resultsTipsTitle: {
//     fontFamily: 'Poppins_700Bold',
//     fontSize: 15,
//     color: '#A855F7',
//     marginBottom: 10,
//   },
//   resultsTipRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
//   resultsTipBullet: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.4)',
//     lineHeight: 20,
//   },
//   resultsTipText: {
//     fontFamily: 'Poppins_400Regular',
//     fontSize: 13,
//     color: 'rgba(255,255,255,0.6)',
//     flex: 1,
//     lineHeight: 20,
//   },
// });

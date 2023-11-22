// "use client";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useToast } from "@/components/ui/use-toast";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import MultiSelectChips from "../ui/multi-select-chips";
// import { useEffect, useRef, useState } from "react";
// import { reviewRequestSchema } from "@/entities/review";
// import usegenerateReview from "@/hooks/use-generate-review";
// import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
// import ReviewCard from "../review-card";
// import { feelBasedOnRating, platforms } from "./data";
// import { delay } from "@/lib/utils";
// import { SAMPLE_STORE } from "@/app/store/[storeId]/data";

// const ReviewGeneratorForm = () => {
//   const form = useForm<z.infer<typeof reviewRequestSchema>>({
//     resolver: zodResolver(reviewRequestSchema),
//     defaultValues: {
//       name: "",
//       type: "",
//       location: "",
//       rating: 5,
//       feel: [],
//     },
//   });

//   const [feel, setFeel] = useState<string[]>([]);

//   const { bufferText, reviews, isLoading, generateReview } = usegenerateReview({
//     store: SAMPLE_STORE,
//     customFieldForm: null,
//   });
//   const [_, copyToClipboard] = useCopyToClipboard();
//   const { toast } = useToast();
//   const endComponent = useRef<HTMLDivElement>(null);

//   const onSubmit = async (values: z.infer<typeof reviewRequestSchema>) => {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     // generateReview(values);
//     await delay(1500);
//     endComponent?.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleCopyToClipboard = (text: string) => {
//     copyToClipboard(text);
//     toast({
//       title: "Copied to Clipboard",
//       description: "The Review has been copied successfully..",
//       variant: "default",
//     });
//   };

//   const formItemCN = "w-full";
//   const rating = form.watch("rating") as number;

//   useEffect(() => {
//     form.setValue("feel", []);
//   }, [rating, form]);

//   return (
//     <div
//       id="review-generator-section"
//       className="min-h-screen px-10 py-20 bg-review-section"
//     >
//       <h1 className="mb-4 text-2xl font-semibold">Review Generator</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
//         <div className="text-[#FFFFFF] bg-[#111111] shadow-xl px-4 md:px-10 py-10 rounded-xl  max-w-3xl">
//           <Form {...form}>
//             <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
//               <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem className={formItemCN}>
//                       <FormLabel>Store Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="McDonalds" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="platform"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Platform</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select the Platform" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {platforms.map((value) => (
//                             <SelectItem key={value} value={value.toString()}>
//                               {value}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="type"
//                   render={({ field }) => (
//                     <FormItem className={formItemCN}>
//                       <FormLabel>Type</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Food Chain" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="location"
//                   render={({ field }) => (
//                     <FormItem className={formItemCN}>
//                       <FormLabel>Location</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Anna Nagar, Chennai" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="rating"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Rating</FormLabel>
//                       <Select onValueChange={field.onChange}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a rating between 1 to 5" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {[1, 2, 3, 4, 5].map((value) => (
//                             <SelectItem key={value} value={value.toString()}>
//                               {value} Star
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>

//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="py-4">
//                 <FormField
//                   control={form.control}
//                   name="feel"
//                   render={({ field }) => (
//                     <FormItem className={formItemCN}>
//                       <FormLabel>How do you feel?</FormLabel>
//                       <FormControl>
//                         <MultiSelectChips
//                           name=""
//                           onChange={(e) => {
//                             form.setValue("feel", e);
//                           }}
//                           value={form.getValues("feel") || []}
//                           options={feelBasedOnRating[rating].map(
//                             (x: string) => ({
//                               value: x,
//                               label: x,
//                             })
//                           )}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <FormField
//                 control={form.control}
//                 name="comments"
//                 render={({ field }) => (
//                   <FormItem className={formItemCN}>
//                     <FormLabel>Additional Comments</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Best place to buy fruits and vegetables"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 disabled={isLoading}
//                 className="mt-10"
//                 variant="outline"
//                 type="submit"
//               >
//                 Generate Review
//               </Button>
//             </form>
//           </Form>
//         </div>
//         <div className="mt-10 md:mt-0">
//           <ScrollArea className="h-max-[600px]">
//             {reviews.length < 1 && !isLoading ? (
//               <ReviewCard review={"Start Generating your First Review!!"} />
//             ) : null}

//             {reviews.map((r, idx) => (
//               <ReviewCard
//                 key={idx}
//                 review={r.review}
//                 reviewRequest={r.reviewRequest}
//                 idx={idx}
//                 copyToClipBoard={handleCopyToClipboard}
//               />
//             ))}

//             {isLoading ? (
//               <ReviewCard review={bufferText} idx={reviews.length} />
//             ) : null}

//             <div ref={endComponent} />
//           </ScrollArea>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewGeneratorForm;

export default {};

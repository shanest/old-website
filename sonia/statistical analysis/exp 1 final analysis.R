#MOST
most=subset.data.frame(most, most$workerid !="3")
most=subset.data.frame(most, most$workerid !="11")
most=subset.data.frame(most, most$workerid !="18")
most=subset.data.frame(most, most$workerid !="28")
most=subset.data.frame(most, most$workerid !="31")
most=subset.data.frame(most, most$workerid !="34")
most=subset.data.frame(most, most$workerid !="35")
most=subset.data.frame(most, most$workerid !="36")
most=subset.data.frame(most, most$workerid !="38")
most=subset.data.frame(most, most$workerid !="41")
most=subset.data.frame(most, most$workerid !="45")
most=subset.data.frame(most, most$workerid !="47")
most=subset.data.frame(most, most$workerid !="53")
most=subset.data.frame(most, most$workerid !="58")
most=subset.data.frame(most, most$workerid !="62")
most=subset.data.frame(most, most$workerid !="68")
most=subset.data.frame(most, most$workerid !="71")
most=subset.data.frame(most, most$workerid !="75")
most=subset.data.frame(most, most$workerid !="77")
most=subset.data.frame(most, most$workerid !="82")
most=subset.data.frame(most, most$workerid !="84")

most$read_and_decide_time[which(most$read_and_decide_time <300)]
most=subset.data.frame(most, most$read_and_decide_time>300)


#most long outliers (true responses)
most_true=subset.data.frame(most, most$percent>50)
mean(most_true$read_and_decide_time)+2*sd(most_true$read_and_decide_time)
most_true=subset.data.frame(most_true, most_true$read_and_decide_time<3549.951)

hist(most_true$read_and_decide_time)
nrow(most_true)

most_true$response=="0"

#most long outliers (false responses)
most_false=subset.data.frame(most, most$percent<50)
mean(most_false$read_and_decide_time)+2*sd(most_false$read_and_decide_time)
most_false=subset.data.frame(most_false, most_false$read_and_decide_time<4818.626)

#most dataset without outliers
most2=rbind(most_true, most_false)


#MTH short outliers
mth=subset.data.frame(mth, mth$workerid !="3")
mth=subset.data.frame(mth, mth$workerid !="11")
mth=subset.data.frame(mth, mth$workerid !="18")
mth=subset.data.frame(mth, mth$workerid !="28")
mth=subset.data.frame(mth, mth$workerid !="31")
mth=subset.data.frame(mth, mth$workerid !="34")
mth=subset.data.frame(mth, mth$workerid !="35")
mth=subset.data.frame(mth, mth$workerid !="36")
mth=subset.data.frame(mth, mth$workerid !="38")
mth=subset.data.frame(mth, mth$workerid !="41")
mth=subset.data.frame(mth, mth$workerid !="45")
mth=subset.data.frame(mth, mth$workerid !="47")
mth=subset.data.frame(mth, mth$workerid !="53")
mth=subset.data.frame(mth, mth$workerid !="58")
mth=subset.data.frame(mth, mth$workerid !="62")
mth=subset.data.frame(mth, mth$workerid !="68")
mth=subset.data.frame(mth, mth$workerid !="71")
mth=subset.data.frame(mth, mth$workerid !="75")
mth=subset.data.frame(mth, mth$workerid !="77")
mth=subset.data.frame(mth, mth$workerid !="82")
mth=subset.data.frame(mth, mth$workerid !="84")

mth$read_and_decide_time[which(mth$read_and_decide_time <300)] 
mth=subset.data.frame(mth, mth$read_and_decide_time >300)

#MTH long outliers (true responses)
mth_true=subset.data.frame(mth, mth$percent>50)
mean(mth_true$read_and_decide_time)+2*sd(mth_true$read_and_decide_time)
mth_true=subset.data.frame(mth_true, mth_true$read_and_decide_time<2865.698)

#MTH long outliers (false responses)
mth_false=subset.data.frame(mth, mth$percent<50)
mean(mth_false$read_and_decide_time)+2*sd(mth_false$read_and_decide_time)
mth_false=subset.data.frame(mth_false, mth_false$read_and_decide_time<2928.831)

#MTH dataset without outliers
mth2=rbind(mth_true, mth_false)


#data set most and mth
data=rbind(most2, mth2)

#Many
many_yes=subset.data.frame(many, many$response==1)

many_yes=subset.data.frame(many_yes, many_yes$workerid !="3")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="11")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="18")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="28")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="31")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="34")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="35")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="36")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="38")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="41")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="45")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="47")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="53")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="58")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="62")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="68")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="71")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="75")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="77")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="82")
many_yes=subset.data.frame(many_yes, many_yes$workerid !="84")

many_yes$read_and_decide_time[which(many_yes$read_and_decide_time <300)]
many_yes=subset.data.frame(many_yes, many_yes$read_and_decide_time>300)


mean(many_yes$read_and_decide_time)+2*sd(many_yes$read_and_decide_time)
many_yes=subset.data.frame(many_yes, many_yes$read_and_decide_time<3723.029)


#mixed effect model
library(lme4)
library(Matrix)
library(languageR)
library(lmerTest)

#models only for true responses most and MTH
data_true=rbind(most_true, mth_true)

#include both (1|Q:workerid) and (1|percent:workerid)
mtrue1.1=lmer(read_and_decide_time~Q+(1|workerid)+(1|Q:workerid)+(1|percent:workerid), data=data_true, REML = FALSE)
mtrue2.1=lmer(read_and_decide_time~percent+(1|workerid)+(1|Q:workerid)+(1|percent:workerid), data=data_true, REML = FALSE)
mtrue3.1=lmer(read_and_decide_time~Q+percent+(1|workerid)+(1|Q:workerid)+(1|percent:workerid), data=data_true, REML = FALSE)
#interaction model
mtrue4.1=lmer(read_and_decide_time~Q*percent+(1|workerid)+(1|Q:workerid)+(1|percent:workerid), data=data_true, REML = FALSE)

#model with interaction Q*percent and Q
mtrue5.1=lmer(read_and_decide_time~(Q*percent)-percent+(1|workerid)+(1|Q:workerid)+(1|percent:workerid), data=data_true, REML = FALSE)
summary(mtrue5.1)

summary(mtrue1.1)
summary(mtrue2.1)
summary(mtrue3.1)
summary(mtrue4.1)
summary(mtrue5.1)

anova(mtrue1.1, mtrue2.1, mtrue3.1, mtrue4.1, mtrue5.1)


#models only for false responses most and MTH
data_false=rbind(most_false, mth_false)

mfalse1.1=lmer(read_and_decide_time~Q+(1|workerid)+(1|Q:workerid)+(1|percent:workerid), data=data_false, REML = FALSE)
mfalse2.1=lmer(read_and_decide_time~percent+(1|workerid)+(1|Q:workerid)+(1|percent:workerid), data=data_false, REML = FALSE)
mfalse3.1=lmer(read_and_decide_time~Q+percent+(1|workerid)+(1|percent:workerid)+(1|Q:workerid), data=data_false, REML = FALSE)
mfalse4.1=lmer(read_and_decide_time~Q*percent+(1|workerid)+(1|Q:workerid), data=data_false, REML = FALSE)
mfalse5.1=lmer(read_and_decide_time~(Q*percent)-percent+(1|workerid)+(1|Q:workerid), data=data_false, REML = FALSE)


summary(mfalse1.1)
summary(mfalse2.1)
summary(mfalse3.1)
summary(mfalse4.1)
summary(mfalse5.1)
anova(mfalse1.1, mfalse2.1, mfalse3.1, mfalse4.1, mfalse5.1)


#Many, most, MTH
#many
many_lmer=lmer(read_and_decide_time~percent+(1|workerid)+(1|percent:workerid), data=many_yes, REML = FALSE)
summary(many_lmer)


#above 50% most and many
many_true=subset.data.frame(many_yes, many_yes$percent>50)
data_mm_true_1=rbind(most_true, many_true)
data_mm_true_1$Q=as.factor(data_mm_true_1$Q)
mm_lmer_1=lmer(read_and_decide_time~percent*relevel(Q, "most")+(1|workerid)+(1|Q:workerid), data=data_mm_true_1, REML = FALSE)
summary(mm_lmer_1)
mm_lmer_1.1=lmer(read_and_decide_time~percent+Q+(1|workerid)+(1|Q:workerid), data=data_mm_true_1, REML = FALSE)
summary(mm_lmer_1.1)

#above 50% mth and many
data_mm_true_2=rbind(mth_true, many_true)
data_mm_true_2$Q=as.factor(data_mm_true_2$Q)
mm_lmer_2=lmer(read_and_decide_time~percent+Q+(1|workerid)+(1|percent:workerid)+(1|Q:workerid), data=data_mm_true_2, REML = FALSE)
summary(mm_lmer_2)
#interaction is not significant

#above 50% most, mth and many
data_mm_true_3=rbind(most_true, many_true, mth_true)
data_mm_true_3$Q=as.factor(data_mm_true_3$Q)
mm_lmer_3=lmer(read_and_decide_time~Q*percent+(1|workerid)+(1|percent:workerid)+(1|Q:workerid), data=data_mm_true_3, REML = FALSE)
summary(mm_lmer_3)
mm_lmer_3.1=lmer(read_and_decide_time~Q+(1|workerid)+(1|percent:workerid)+(1|Q:workerid), data=data_mm_true_3, REML = FALSE)
summary(mm_lmer_3.1)
mm_lmer_3.2=lmer(read_and_decide_time~relevel(Q, "most")+percent+(1|workerid)+(1|percent:workerid)+(1|Q:workerid), data=data_mm_true_3, REML = FALSE)
summary(mm_lmer_3.2)
anova(mm_lmer_3.1, mm_lmer_3.2, mm_lmer_3)



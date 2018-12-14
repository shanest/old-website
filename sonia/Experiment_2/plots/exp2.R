#export from exp2-v2 most and "dot_most"; more than half as "dot_MTH", "more...than" as "dot_more"
a=rep(c(15:24), each=318)
exp2.v2.trials$workerid=a
exp2.v2.pilot2.trials=rbind(exp2.v2.pilot2.trials, exp2.v2.trials)
levels(exp2.v2.pilot2.trials$workerid)
exp2.v2.pilot2.trials$workerid=as.factor(exp2.v2.pilot2.trials$workerid)

exp2.v2.pilot2.trials$colour_grater=ifelse(exp2.v2.pilot2.trials$proportion=="\"b5_y10\""|
                       exp2.v2.pilot2.trials$proportion=="\"b6_y9\""|
                       exp2.v2.pilot2.trials$proportion=="\"b6_y8\""|
                       exp2.v2.pilot2.trials$proportion=="\"b5_y6\""|
                       exp2.v2.pilot2.trials$proportion=="\"b7_y8\""|
                       exp2.v2.pilot2.trials$proportion=="\"b8_y9\""|
                       exp2.v2.pilot2.trials$proportion=="\"b10_y20\""|
                       exp2.v2.pilot2.trials$proportion=="\"b12_y18\""|
                       exp2.v2.pilot2.trials$proportion=="\"b12_y16\""|
                       exp2.v2.pilot2.trials$proportion=="\"b15_y18\""|
                       exp2.v2.pilot2.trials$proportion=="\"b14_y16\""|
                       exp2.v2.pilot2.trials$proportion=="\"b16_y18\""|
                       exp2.v2.pilot2.trials$proportion=="\"b15_y30\""|
                       exp2.v2.pilot2.trials$proportion=="\"b18_y27\""|
                       exp2.v2.pilot2.trials$proportion=="\"b18_y24\""|
                       exp2.v2.pilot2.trials$proportion=="\"b20_y24\""|
                       exp2.v2.pilot2.trials$proportion=="\"b21_y24\""|
                       exp2.v2.pilot2.trials$proportion=="\"b24_y27\"",
                     c("\"yellow\""),c("\"blue\""))

exp2.v2.pilot2.trials$set_size=ifelse(exp2.v2.pilot2.trials$proportion %in% c("\"b5_y10\"","\"b10_y5\"", "\"b6_y9\"","\"b9_y6\"","\"b6_y8\"","\"b8_y6\"","\"b5_y6\"","\"b6_y5\"","\"b7_y8\"","\"b8_y7\"","\"b8_y9\"","\"b9_y8\""), c("small"),
                ifelse(exp2.v2.pilot2.trials$proportion %in% c("\"b20_y10\"","\"b10_y20\"","\"b12_y18\"","\"b18_y12\"", "\"b12_y16\"","\"b16_y12\"","\"b15_y18\"","\"b18_y15\"","\"b14_y16\"","\"b16_y14\"","\"b16_y18\"","\"b18_y16\""), c("medium"),
                       c("large")))
exp2.v2.pilot2.trials$prop=ifelse(exp2.v2.pilot2.trials$proportion %in% c("\"b5_y10\"","\"b10_y5\"","\"b20_y10\"","\"b10_y20\"","\"b15_y30\"","\"b30_y15\""), c("1:2"),
            ifelse(exp2.v2.pilot2.trials$proportion %in% c("\"b6_y9\"","\"b9_y6\"","\"b12_y18\"","\"b18_y12\"","\"b27_y18\"","\"b18_y27\""), c("2:3"),
                   ifelse(exp2.v2.pilot2.trials$proportion %in% c("\"b6_y8\"","\"b8_y6\"","\"b12_y16\"","\"b16_y12\"","\"b24_y18\"","\"b18_y24\""), c("3:4"),
                          ifelse(exp2.v2.pilot2.trials$proportion %in% c("\"b6_y5\"","\"b5_y6\"","\"b15_y18\"","\"b18_y15\"","\"b24_y20\"","\"b20_y24\""), c("5:6"),
                                 ifelse(exp2.v2.pilot2.trials$proportion %in% c("\"b7_y8\"","\"b8_y7\"","\"b14_y16\"","\"b16_y14\"","\"b24_y21\"","\"b21_y24\""), c("7:8"),
                                                            c("8:9"))))))

str(exp2.v2.pilot2.trials)
dot_most=subset.data.frame(exp2.v2.pilot2.trials, exp2.v2.pilot2.trials$quant=="\"Most\"")
dot_MTH=subset.data.frame(exp2.v2.pilot2.trials, exp2.v2.pilot2.trials$quant=="\"More than half\"")
dot_more=subset.data.frame(exp2.v2.pilot2.trials, exp2.v2.pilot2.trials$quant=="\"More\"")
dot_many=subset.data.frame(exp2.v2.pilot2.trials, exp2.v2.pilot2.trials$quant=="\"Many\"")

dot_most$response=ifelse(dot_most$response=="false", 0,1)
dot_MTH$response=ifelse(dot_MTH$response=="false", 0,1)
dot_more$response=ifelse(dot_more$response=="false", 0,1)
dot_many$response=ifelse(dot_many$response=="false", 0,1)

dot_most$correct_resp=ifelse(dot_most$color==dot_most$colour_grater,1, 0)
dot_most$accuacy=ifelse(dot_most$correct_resp==dot_most$response,1, 0)

dot_MTH$correct_resp=ifelse(dot_MTH$color==dot_MTH$colour_grater,1, 0)
dot_MTH$accuacy=ifelse(dot_MTH$correct_resp==dot_MTH$response,1, 0)

dot_more$correct_resp=ifelse(dot_more$color==dot_more$colour_grater,1, 0)
dot_more$accuacy=ifelse(dot_more$correct_resp==dot_more$response,1, 0)

#clean data
dot_most=subset.data.frame(dot_most, dot_most$accuacy==1)
dot_MTH=subset.data.frame(dot_MTH, dot_MTH$accuacy==1)
dot_more=subset.data.frame(dot_more, dot_more$accuacy==1)

dot_most=subset.data.frame(dot_most, dot_most$read_and_decide_time>300)
dot_MTH=subset.data.frame(dot_MTH, dot_MTH$read_and_decide_time>300)
dot_more=subset.data.frame(dot_more, dot_more$read_and_decide_time>300)
dot_many=subset.data.frame(dot_many, dot_many$read_and_decide_time>300)

dot_many_true=subset.data.frame(dot_many, dot_many$response==1)
many_cut=mean(dot_many_true$read_and_decide_time)+2*sd(dot_many_true$read_and_decide_time)
dot_many_true=subset.data.frame(dot_many_true, dot_many_true$read_and_decide_time<many_cut)

#true responses
dot_most_true=subset.data.frame(dot_most, dot_most$correct_resp==1)
dot_MTH_true=subset.data.frame(dot_MTH, dot_MTH$correct_resp==1)
dot_more_true=subset.data.frame(dot_more, dot_more$correct_resp==1)

most_cut=mean(dot_most_true$read_and_decide_time)+2*sd(dot_most_true$read_and_decide_time)
dot_most=subset.data.frame(dot_most_true, dot_most_true$read_and_decide_time<most_cut)
MTH_cut=mean(dot_MTH_true$read_and_decide_time)+2*sd(dot_MTH_true$read_and_decide_time)
dot_MTH=subset.data.frame(dot_MTH_true, dot_MTH_true$read_and_decide_time<MTH_cut)
more_cut=mean(dot_more_true$read_and_decide_time)+2*sd(dot_more_true$read_and_decide_time)
dot_more=subset.data.frame(dot_more_true, dot_more_true$read_and_decide_time<more_cut)

#set size effet
most_mean_set_w=with(dot_most_true, tapply(read_and_decide_time, list(workerid, set_size), mean))
most_set_w=data.frame(mean=c(large=most_mean_set_w[,1], medium=most_mean_set_w[,2], small=most_mean_set_w[,3]),
                      set_size=rep(c("large", "medium", "small"), each=25), workerid=c(0:24))
MTH_mean_set_w=with(dot_MTH_true, tapply(read_and_decide_time, list(workerid, set_size), mean))
MTH_set_w=data.frame(mean=c(large=MTH_mean_set_w[,1], medium=MTH_mean_set_w[,2], small=MTH_mean_set_w[,3]),
                     set_size=rep(c("large", "medium", "small"), each=25), workerid=c(0:24))
more_mean_set_w=with(dot_more_true, tapply(read_and_decide_time, list(workerid, set_size), mean))
more_set_w=data.frame(mean=c(large=more_mean_set_w[,1], medium=more_mean_set_w[,2], small=more_mean_set_w[,3]),
                      set_size=rep(c("large", "medium", "small"), each=25), workerid=c(0:24))
many_mean_set_w=with(dot_many_true, tapply(read_and_decide_time, list(workerid, set_size), mean))
many_set_w=data.frame(mean=c(large=many_mean_set_w[,1], medium=many_mean_set_w[,2], small=many_mean_set_w[,3]),set_size=rep(c("large", "medium", "small"), each=25), workerid=c(0:24))


library(plyr)
library(lattice)
library(Rmisc)
most_mean_set <- summarySEwithin(most_set_w, measurevar="mean", withinvars="set_size",
                        idvar="workerid", na.rm=TRUE, conf.interval=.95)
MTH_mean_set <- summarySEwithin(MTH_set_w, measurevar="mean", withinvars="set_size",
                                 idvar="workerid", na.rm=TRUE, conf.interval=.95)

more_mean_set <- summarySEwithin(more_set_w, measurevar="mean", withinvars="set_size",
                                idvar="workerid", na.rm=TRUE, conf.interval=.95)
many_mean_set <- summarySEwithin(many_set_w, measurevar="mean", withinvars="set_size",
                                idvar="workerid", na.rm=TRUE, conf.interval=.95)

SEM=c(most_mean_set[,5], MTH_mean_set[,5], more_mean_set[,5])
SEM_1=c(most_mean_set[,5], MTH_mean_set[,5], more_mean_set[,5], many_mean_set[,5])
dot_size=data.frame(mean=c(most_mean_set[,3], MTH_mean_set[,3], more_mean_set[,3]),SEM, size=rep(c("large", "medium", "small")), Q=rep(c("most", "more than half", "more"), each=3))
dot_size_many=data.frame(mean=c(most_mean_set[,3], MTH_mean_set[,3], more_mean_set[,3], many_mean_set[,3]),SEM_1, size=rep(c("large", "medium", "small")), Q=rep(c("most", "more than half", "more", "many"), each=3))

library(ggplot2)
ggplot(data=dot_size, aes(x=size, y=mean, group=Q)) +
  geom_point(aes(color=Q, shape=Q))+
  geom_errorbar(aes(ymin=mean-SEM, ymax=mean+SEM, color=Q), width=0.2, position=position_dodge(0.05))+
  geom_smooth(aes(color=Q))+
  theme_classic()+
  labs(title="Set size - true resp (scatter split)")

 ggplot(data=dot_size_many, aes(x=size, y=mean, group=Q)) +
  geom_point(aes(color=Q, shape=Q))+
  geom_errorbar(aes(ymin=mean-SEM_1, ymax=mean+SEM_1, color=Q), width=0.2, position=position_dodge(0.05))+
  geom_smooth(aes(color=Q))+
  theme_classic()+
  labs(title="Set size - true resp with many (scatter split)")

#proportion effect
 prop=c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9")
 most_mean_prop_w=with(dot_most_true, tapply(read_and_decide_time, list(workerid, prop), mean))
 most_prop_w=data.frame(mean=c(most_mean_prop_w[,1], most_mean_prop_w[,2], most_mean_prop_w[,3], most_mean_prop_w[,4], most_mean_prop_w[,5], most_mean_prop_w[,6]),prop=rep(prop, each=25), workerid=c(0:24))
 MTH_mean_prop_w=with(dot_MTH_true, tapply(read_and_decide_time, list(workerid, prop), mean))
 MTH_prop_w=data.frame(mean=c(MTH_mean_prop_w[,1], MTH_mean_prop_w[,2], MTH_mean_prop_w[,3], MTH_mean_prop_w[,4], MTH_mean_prop_w[,5], MTH_mean_prop_w[,6]),prop=rep(prop, each=25), workerid=c(0:24))
 more_mean_prop_w=with(dot_more_true, tapply(read_and_decide_time, list(workerid, prop), mean))
 more_prop_w=data.frame(mean=c(more_mean_prop_w[,1], more_mean_prop_w[,2], more_mean_prop_w[,3], more_mean_prop_w[,4], more_mean_prop_w[,5], more_mean_prop_w[,6]),prop=rep(prop, each=25), workerid=c(0:24))
 many_mean_prop_w=with(dot_many_true, tapply(read_and_decide_time, list(workerid, prop), mean))
 many_prop_w=data.frame(mean=c(many_mean_prop_w[,1], many_mean_prop_w[,2], many_mean_prop_w[,3], many_mean_prop_w[,4], many_mean_prop_w[,5], many_mean_prop_w[,6]),prop=rep(prop, each=25), workerid=c(0:24))
 

 most_mean_prop <- summarySEwithin(most_prop_w, measurevar="mean", withinvars="prop",
                                  idvar="workerid", na.rm=TRUE, conf.interval=.95)
 MTH_mean_prop <- summarySEwithin(MTH_prop_w, measurevar="mean", withinvars="prop",
                                 idvar="workerid", na.rm=TRUE, conf.interval=.95)
 
 more_mean_prop <- summarySEwithin(more_prop_w, measurevar="mean", withinvars="prop",
                                  idvar="workerid", na.rm=TRUE, conf.interval=.95)
 many_mean_prop <- summarySEwithin(many_prop_w, measurevar="mean", withinvars="prop",
                                  idvar="workerid", na.rm=TRUE, conf.interval=.95)

SEM_prop=c(most_mean_prop[,5], MTH_mean_prop[,5],more_mean_prop[,5], many_mean_prop[,5])
dot_prop= data.frame(mean=c(most_mean_prop[,3], MTH_mean_prop[,3],more_mean_prop[,3]), SEM_prop1=SEM_prop[1:18], prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9")), Q=rep(c("most", "more than half", "more"), each=6))
dot_prop_many= data.frame(mean=c(most_mean_prop[,3], MTH_mean_prop[,3],more_mean_prop[,3], many_mean_prop[,3]), SEM_prop, prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9"), 4), Q=rep(c("most", "more than half", "more", "many"), each=6))

ggplot(data=dot_prop, aes(x=prop, y=mean, group=Q)) +
  geom_point(aes(color=Q, shape=Q))+
  geom_smooth(aes(color=Q))+
  geom_errorbar(aes(ymin=mean-SEM_prop1, ymax=mean+SEM_prop1, color=Q), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="Proportions - true resp (scatter split)")

ggplot(data=dot_prop_many, aes(x=prop, y=mean, group=Q)) +
  geom_point(aes(color=Q, shape=Q))+
  geom_smooth(aes(color=Q))+
  geom_errorbar(aes(ymin=mean-SEM_prop, ymax=mean+SEM_prop, color=Q), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="Proportions - true resp with many (scatter split)")


#proportion and set size
prop_1=c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9")
most_set_prop_w=with(dot_most_true, tapply(read_and_decide_time, list(prop, set_size, workerid), mean))
MTH_set_prop_w=with(dot_MTH_true, tapply(read_and_decide_time, list(workerid,prop, set_size), mean))
more_set_prop_w=with(dot_more_true, tapply(read_and_decide_time, list(workerid,prop, set_size), mean))
many_set_prop_w=with(dot_many_true, tapply(read_and_decide_time, list(workerid,prop, set_size), mean))

most_set_prop_ww=data.frame(mean=c(most_set_prop_w[,1,], most_set_prop_w[,2,], most_set_prop_w[,3,]),set_size=rep(c("large", "medium", "small"), each=150), prop=rep(rep(prop_1, each=25),3), workerid=c(0:24))
MTH_set_prop_ww=data.frame(mean=c(MTH_set_prop_w[,1,], MTH_set_prop_w[,2,], MTH_set_prop_w[,3,]),set_size=rep(c("large", "medium", "small"), each=150), prop=rep(rep(prop_1, each=25),3), workerid=c(0:24))
more_set_prop_ww=data.frame(mean=c(more_set_prop_w[,1,], more_set_prop_w[,2,], more_set_prop_w[,3,]),set_size=rep(c("large", "medium", "small"), each=150), prop=rep(rep(prop_1, each=25),3), workerid=c(0:24))
many_set_prop_ww=data.frame(mean=c(many_set_prop_w[,1,], many_set_prop_w[,2,], many_set_prop_w[,3,]),set_size=rep(c("large", "medium", "small"), each=150), prop=rep(rep(prop_1, each=25),3), workerid=c(0:24))



most_set_prop <- summarySEwithin(most_set_prop_ww, measurevar="mean", withinvars=c("set_size", "prop"),
                                  idvar="workerid", na.rm=TRUE, conf.interval=.95)

MTH_set_prop <- summarySEwithin(MTH_set_prop_ww, measurevar="mean", withinvars=c("set_size", "prop"),
                                  idvar="workerid", na.rm=TRUE, conf.interval=.95)

more_set_prop <- summarySEwithin(more_set_prop_ww, measurevar="mean", withinvars=c("set_size", "prop"),
                                 idvar="workerid", na.rm=TRUE, conf.interval=.95)

many_set_prop <- summarySEwithin(many_set_prop_ww, measurevar="mean", withinvars=c("set_size", "prop"),
                                 idvar="workerid", na.rm=TRUE, conf.interval=.95)

small_set_prop=data.frame(mean=c(most_set_prop[13:18,4], MTH_set_prop[13:18,4], more_set_prop[13:18,4], many_set_prop[13:18,4]), 
                          sem_s=c(most_set_prop[13:18,6], MTH_set_prop[13:18,6], more_set_prop[13:18,6], many_set_prop[13:18,6]),
                          prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9"), 4), Q=rep(c("most", "more than half", "more", "many"), each=6))

ggplot(data=small_set_prop, aes(x=prop, y=mean, group=Q, color=Q)) +
  geom_line()+
  geom_point()+
  geom_errorbar(aes(ymin=mean-sem_s, ymax=mean+sem_s), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="Small set - true resp")


medium_set_prop=data.frame(mean=c(most_set_prop[7:12,4], MTH_set_prop[7:12,4], more_set_prop[7:12,4], many_set_prop[7:12,4]), 
                           sem_m=c(most_set_prop[7:12,6], MTH_set_prop[7:12,6], more_set_prop[7:12,6], many_set_prop[7:12,6]),
                           prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9"), 4), Q=rep(c("most", "more than half", "more", "many"), each=6))

ggplot(data=medium_set_prop, aes(x=prop, y=mean, group=Q, color=Q)) +
  geom_line()+
  geom_point()+
  geom_errorbar(aes(ymin=mean-sem_m, ymax=mean+sem_m), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="Medium set - true resp")


larg_set_prop=data.frame(mean=c(most_set_prop[1:6,4], MTH_set_prop[1:6,4], more_set_prop[1:6,4], many_set_prop[1:6,4]), 
                         sem_l=c(most_set_prop[1:6,6], MTH_set_prop[1:6,6], more_set_prop[1:6,6], many_set_prop[1:6,6]),
                         prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9"), 4), Q=rep(c("most", "more than half", "more", "many"), each=6))


ggplot(data=larg_set_prop, aes(x=prop, y=mean, group=Q, color=Q)) +
  geom_line()+
  geom_point()+
  geom_errorbar(aes(ymin=mean-sem_l, ymax=mean+sem_l), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="Large set - true resp")


#prop, set per quantifier
most_prop_set=data.frame(mean=c(most_set_prop[13:18,4], most_set_prop[7:12,4], most_set_prop[1:6,4]),
                         sem_most=c(most_set_prop[13:18,6], most_set_prop[7:12,6], most_set_prop[1:6,6]),
                         prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9"), 3), size=rep(c("small", "medium", "large"),each=6 ))

ggplot(data = most_prop_set, aes(x=size, y=mean, color=prop, group=prop))+
  geom_line()+
  geom_point()+
  geom_errorbar(aes(ymin=mean-sem_most, ymax=mean+sem_most), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="Most - true resp")

MTH_prop_set=data.frame(mean=c(MTH_set_prop[13:18,4], MTH_set_prop[7:12,4], MTH_set_prop[1:6,4]),
                        sem_mth=c(MTH_set_prop[13:18,6], MTH_set_prop[7:12,6], MTH_set_prop[1:6,6]),
                        prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9"), 3), size=rep(c("small", "medium", "large"),each=6 ))

ggplot(data = MTH_prop_set, aes(x=size, y=mean, color=prop, group=prop))+
  geom_line()+
  geom_point()+
  geom_errorbar(aes(ymin=mean-sem_mth, ymax=mean+sem_mth), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="More than half - true resp")

more_prop_set=data.frame(mean=c(more_set_prop[13:18,4], more_set_prop[7:12,4], more_set_prop[1:6,4]),
                         sem_more=c(more_set_prop[13:18,4], more_set_prop[7:12,4], more_set_prop[1:6,4]),
                         prop=rep(c("1:2", "2:3", "3:4", "5:6", "7:8", "8:9"), 3), size=rep(c("small", "medium", "large"),each=6 ))

ggplot(data = more_prop_set, aes(x=size, y=mean, color=prop, group=prop))+
  geom_line()+
  geom_point()+
  geom_errorbar(aes(ymin=mean-sem_more, ymax=mean+sem_more), width=0.2, position=position_dodge(0.05))+
  theme_classic()+
  labs(title="More ... than - true resp")





data=rbind(dot_more_true, dot_most_true, dot_MTH_true)
colnames(data)
library(lmerTest)
lme=lmer(read_and_decide_time~quant+set_size+(1| workerid), data=data)
summary(lmer(read_and_decide_time~quant*set_size+(1| workerid), data=data))


data$pred <- predict(lme)
pred <- aggregate(pred~quant*set_size, mean, data=data)
library(ggplot2)
ggplot(data=pred, aes(x=set_size, y=pred, group=quant)) +
  geom_point(aes(color=quant, shape=quant))+
  theme_classic()








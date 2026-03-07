import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Stack,
  Card,
  Grid,
  Tab,
  Divider
} from '@mui/material';
import { useParams } from 'src/routes/hooks';
import { getAdvertDetails, getUserDetails } from 'src/lib/actions/ilan';
import { CustomTabs } from "src/components/custom-tabs";
import { Markdown } from 'src/components/markdown';
import { useTabs } from "minimal-shared/hooks";
import calendaIcon1 from "../icons/ic-eva_arrow-ios-back-fill.svg";
import calendaIcon from "../icons/ic-eva_arrow-ios-forward-fill.svg";
import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { fCurrency } from "src/utils/format-number";

const TABS = [
  { value: 0, label: "İlan Açıklaması" },
  { value: 1, label: "Teknik Özellikler" },
  { value: 2, label: "Geçmiş" },
];

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export function JobDetailsContent({ job }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const tabs = useTabs(0);
  const [advertDetails, setAdvertDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        console.log("🔍 İlan detayı yükleniyor, ID:", id);
        
        const details = await getAdvertDetails(id);
        console.log("✅ İlan detayı alındı:", details);
        
        setAdvertDetails(details);
        setUserDetails(details.user || null);
        
      } catch (error) {
        console.error('❌ İlan detayı hatası:', error);
        // Hata durumunda job prop'undan kullan
        if (job) {
          console.log("⚠️ Job prop kullanılıyor:", job);
          setAdvertDetails({
            id: job.id,
            title: job.title,
            description: job.content || "Açıklama yok",
            price: job.salary?.price || 0,
            features: job.features || [],
            adImages: job.images || [],
            created_at: job.createdAt,
            user: {
              firstName: "Demo",
              lastName: "User",
              email: "demo@minimals.cc",
              phoneNumber: "+90 555 123 4567",
            }
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id, job]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  if (!advertDetails) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>İlan bulunamadı</Typography>
      </Box>
    );
  }

  const handleNext = () => {
    if (currentImageIndex < advertDetails.adImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const renderOverview = () => {
    const features = advertDetails.features?.filter(feature => feature.featureValue) || [];

    return (
      <Card sx={{ 
        p: 3, 
        height: 'auto',
        mt: { xs: 3, md: 2 },
        backgroundColor: '#fff',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
      }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          gap: 1,
          alignItems: 'center',
          py: 1 
        }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Fiyat
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: 'primary.main',
                color: 'common.white',
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                typography: 'subtitle2',
              }}
            >
              {advertDetails.price ? `${fCurrency(advertDetails.price)}` : 'Belirtilmedi'}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 0 }} />

        {/* Tarihi göster */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          gap: 1,
          alignItems: 'center',
          py: 1 
        }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            İlan Tarihi
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
            {new Date(advertDetails.created_at).toLocaleDateString('tr-TR')}
          </Typography>
        </Box>
        <Divider sx={{ my: 0 }} />

        {features.map((feature, index) => (
          <React.Fragment key={feature.id}>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: '150px 1fr',
              gap: 1,
              alignItems: 'center',
              py: 1 
            }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {feature.featureName}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                {feature.featureValue}
              </Typography>
            </Box>
            {index < features.length - 1 && <Divider sx={{ my: 0 }} />}
          </React.Fragment>
        ))}
      </Card>
    );
  };

  const renderContent = () => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      width: '100%',
      mt: -1.5,
    }}>

      <Card sx={{ 
        p: 0, 
        boxShadow: 'none', 
        border: 'none',
        borderRadius: '8px',
        overflow: 'hidden',
        height: 'fit-content'
      }}>
        <img
          src={advertDetails.adImages[currentImageIndex]?.imageUrl}
          alt={advertDetails.title}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '400px',
            objectFit: 'cover',
          }}
        />
      </Card>

      {/* Fotoğraf sayacı */}
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        py: 1
      }}>
        <Typography variant="h6" sx={{ 
          fontFamily: 'Public Sans', 
          fontSize: '14px', 
          fontWeight: 400, 
          lineHeight: '22px', 
          textAlign: 'center', 
          color: '#1C252E' 
        }}>
          {currentImageIndex + 1}/{advertDetails.adImages.length} Fotoğraf
        </Typography>
      </Box>

      <Card sx={{ 
        p: 2,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          width: '100%',
          mb: 2
        }}>
          {advertDetails.adImages.map((image, idx) => (
            <Box
              key={image.id}
              onClick={() => setCurrentImageIndex(idx)}
              sx={{
                cursor: 'pointer',
                border: currentImageIndex === idx ? '2px solid' : '1px solid',
                borderColor: currentImageIndex === idx ? 'primary.main' : 'divider',
                borderRadius: '4px',
                aspectRatio: '1/1',
                overflow: 'hidden'
              }}
            >
              <img
                src={image.imageUrl}
                alt={`Thumbnail ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2
        }}>
          <img
            src={calendaIcon1}
            alt="Back Arrow"
            style={{ 
              width: 24, 
              height: 24, 
              cursor: currentImageIndex > 0 ? 'pointer' : 'not-allowed', 
              opacity: currentImageIndex > 0 ? 1 : 0.5 
            }}
            onClick={handlePrev}
          />
          <img
            src={calendaIcon}
            alt="Forward Arrow"
            style={{ 
              width: 24, 
              height: 24, 
              cursor: currentImageIndex < advertDetails.adImages.length - 1 ? 'pointer' : 'not-allowed', 
              opacity: currentImageIndex < advertDetails.adImages.length - 1 ? 1 : 0.5 
            }}
            onClick={handleNext}
          />
        </Box>
      </Card>
    </Box>
  );

  const renderTabsInContent = () => (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ 
        p: 0,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
      }}>
        <CustomTabs
          value={tabs.value}
          onChange={tabs.onChange}
          variant="fullWidth"
          slotProps={{ tab: { px: 0 } }}
        >
          {TABS.map((tab) => (
            <Tab 
              key={tab.value} 
              value={tab.value} 
              label={tab.label} 
              sx={{ fontWeight: 'bold' }} 
            />
          ))}
        </CustomTabs>

        <Box sx={{ mt: 3, p: 3 }}>
          <CustomTabPanel value={tabs.value} index={0}>
            <Typography 
              variant="body2" 
              color="textSecondary"
              sx={{ 
                width: '100%',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              <Markdown children={advertDetails.description} />
            </Typography>
          </CustomTabPanel>

          <CustomTabPanel value={tabs.value} index={1}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              {[
                { name: 'Sunroof', checked: true },
                { name: 'Klima', checked: true },
                { name: 'Klima', checked: true },
                { name: 'Alaşım Jant', checked: true },
                { name: 'Park Sensörü', checked: true },
                { name: 'Şerit Takip Sistemi', checked: true },
                { name: 'ABS', checked: false },
                { name: 'Klima', checked: true },
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: feature.checked ? 'text.primary' : 'text.secondary'
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 20, 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.checked && (
                      <span style={{ color: '#FF0000' }}>✓</span>
                    )}
                  </Box>
                  <Typography variant="body2">
                    {feature.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={tabs.value} index={2}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Sürüm 1.0</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    İlan oluşturuldu.
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      Güncelleme Tarihi: 28 Ocak 2025
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Kullanıcı: user1@example.com
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Sürüm 2.0</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Değişiklik: İlan detayı düzeltildi.
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      Güncelleme Tarihi: 28 Ocak 2025
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Kullanıcı: user1@example.com
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Sürüm 3.0</Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    Değişiklik: Görsel eklendi.
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      Güncelleme Tarihi: 28 Ocak 2025
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Kullanıcı: admin@example.com
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </CustomTabPanel>
        </Box>
      </Card>
    </Box>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ p: 0, mb: -2, mt: -1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            wordBreak: 'break-word',
            lineHeight: 0.6,
            fontSize: { xs: '1.25rem', md: '1.60rem' },
            fontWeight: 600,
            mb: 2,
            pt: 0
          }}
        >
          {advertDetails.title}
        </Typography>
      </Grid>

      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ 
              p: 0, 
              mt: 2,
              display: 'flex', 
              flexDirection: 'column', 
              boxShadow: 'none', 
              border: 'none',
              height: '100%'
            }} elevation={0}>
              <Box sx={{ width: '100%' }}>
                {renderContent()}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            {renderOverview()}
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, width: '100%' }}>
          {renderTabsInContent()}
        </Box>
      </Grid>

      <Grid item xs={12} md={3} sx={{ mt: { xs: 6, md: 2 } }}>
        <Card sx={{ 
          p: 3,
          height: 'fit-content',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
        }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                src={userDetails?.profilePhoto} 
                sx={{ 
                  width: 48, 
                  height: 48,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                {userDetails ? 
                  `${userDetails.firstName?.[0] || ''}${userDetails.lastName?.[0] || ''}` : 
                  'CK'
                }
              </Avatar>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                {userDetails ? 
                  `${userDetails.firstName || ''} ${userDetails.lastName || ''}` : 
                  'İsimsiz Kullanıcı'
                }
              </Typography>
            </Box>

            <Stack spacing={1}>
              {userDetails?.phoneNumber && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px'
                    }}
                  >
                    {userDetails.phoneNumber}
                  </Typography>
                </Box>
              )}

              {userDetails?.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '22px'
                    }}
                  >
                    {userDetails.email}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
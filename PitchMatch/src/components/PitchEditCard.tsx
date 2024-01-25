import { Container, Card, CardHeader, Divider, CardContent, Grid, TextField, Button, Box } from "@mui/material";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../App";
import { getPitch } from "../pages/PitchPage";
import { UserParamsType } from "../pages/UserPage";
import { style1 } from "./CreatePitchComponent";
import { LocationFinder } from "./LocationFinder";
import { PitchPageProps } from "./PitchPageComponent";

type EditPitchProps = {
  title: string;
  summary: string;
  description: string;
  imgUrl: string;
  videoUrl: string;
  location: string;
  goal: number;
  pitchYield: number;
  categories: string;
  latitude: number;
  longitude: number;
};

export async function updatePitchAsync(
  newPitch: EditPitchProps,
  id: number
): Promise<EditPitchProps> {
  const res = await fetch(`https://pitchmatch.azurewebsites.net/Pitch/${id}?pitchId=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPitch),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(JSON.stringify(errorData));
  }
  return await res.json();
}

export function PitchEditCard() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [goal, setGoal] = useState<number>(0);
  const [pitchYield, setPitchYield] = useState<number>(0);
  const [categories, setCategories] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [location, setLocation] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  const [newPitch, setNewPitch] = useState<Partial<EditPitchProps>>({});
  const { id } = useParams<keyof UserParamsType>() as UserParamsType;

  const handleAddressChange = (address: string) => {
    setRegisteredAddress(address);
    setLocation(address);
    handleFieldChange("location", address);
  };

  const handleLatitudeChange = (value: number) => {
    setLatitude(value);
    handleFieldChange("latitude", value);
  };

  const handleLongitudeChange = (value: number) => {
    setLongitude(value);
    handleFieldChange("longitude", value);
  };
const handleFieldChange = (fieldName: string, value: any) => {
    setNewPitch((prevNewPitch) => ({
      ...prevNewPitch,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const pitch = await getPitch(parseInt(id, 10));

        setTitle(pitch.title || "");
        setSummary(pitch.summary || "");
        setDescription(pitch.description || "");
        setImgUrl(pitch.imgUrl || "");
        setVideoUrl(pitch.videoUrl || "");
        setGoal(pitch.goal || 0);
        setPitchYield(pitch.pitchYield || 0);
        setCategories(pitch.categories || "");
        setRegisteredAddress(pitch.location || "");
        setLatitude(pitch.latitude || 0);
        setLongitude(pitch.longitude || 0);
        setLocation(pitch.location || "");
      } catch (error: any) {
        if (error.message) {
          const errorData = JSON.parse(error.message);
          if (errorData.errors) {
            const errorMessages = Object.values(errorData.errors).flat();
            setErrorMessage(errorMessages.join(" "));
            return;
          }
        }
        setErrorMessage("An unexpected error occurred.");
      }
    };

    fetchData();
  }, [id, token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await updatePitchAsync(
        {
          title,
          summary,
          description,
          imgUrl,
          videoUrl,
          location,
          goal,
          pitchYield,
          categories,
          latitude,
          longitude,
        },
        parseInt(id, 10)
      );
    
    // Navigate after successful parsing
    console.log('Navigating to /pitch/', id);
    navigate(`/pitch/${id}`);
    } catch (error: any) {
      if (error.message) {
        const errorData = JSON.parse(error.message);
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          setErrorMessage(errorMessages.join(" "));
          return;
        }
      }
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const handleCancel = () => {
    navigate(`/pitch/${id}`);
  }

return (
    <Container>
      <Card sx={style1}>
        <CardHeader title="Edit"  />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  value={title}
                  onChange={(e) => {
                                    setTitle(e.target.value);
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="summary"
                  label="Pitch Summary (this will be visible to everyone)"
                  value={summary}
                  onChange={(e) => {
                                    setSummary(e.target.value);
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Write about your proposal (this will only be shown to verified users)"
                  value={description}
                  onChange={(e) => {
                                    setDescription(e.target.value);
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="picture"
                  label="Add a picture URL"
                  value={imgUrl}
                  onChange={(e) => {
                                    setImgUrl(e.target.value);
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="video"
                  label="Add a video URL"
                  value={videoUrl}
                  onChange={(e) => {
                                    setVideoUrl(e.target.value);
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="goal"
                  label="Goal Capital"
                  type="number"
                  value={goal.toString()}
                  onChange={(e) => {
                                    setGoal(Number(e.target.value));
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="pitchYield"
                  label="Projected annual yield"
                  type="number"
                  value={pitchYield.toString()}
                  onChange={(e) => {
                                    setPitchYield(Number(e.target.value));
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="categories"
                  label="Categories"
                  value={categories}
                  onChange={(e) => {
                                    setCategories(e.target.value);
                                    handleFieldChange("title", e.target.value);
                                }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                  name="location"
                  label="Location"
                  value={location}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
              <LocationFinder 
                onRegisterAddress={handleAddressChange}
                onLatitudeChange={handleLatitudeChange}
                onLongitudeChange={handleLongitudeChange}
              />
              </Grid>
              </Grid>
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <Button type="submit" variant="contained" color="success" sx={{ marginTop: 2, "&:focus": { outline: "none", } }}>
              Save
              </Button>
          </form>
           <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                  <Button onClick={handleCancel} variant="contained" color="success">
                     Cancel
                   </Button>
                  </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
